'use strict';

define(function (require) {
	var $ = require('jquery');
	var ko = require('knockout');
    var role = require('role');
	var sandbox = require('sandbox');
	require('k/kendo.grid.min');

	var MemberListViewModel = function () {
		this.$selector = $('#RosterGrid'); 

		this.actives = ko.observableArray([]);
		this.alumni = ko.observableArray([]);
		this.affiliates = ko.observableArray([]);
		this.view = ko.observable('Active');

		// init events
		this.getMembers()
		.then(function (members) {
			members.forEach(function (m) {
				if(m.Position & sandbox.constant.role.ACTIVE) { this.actives.push(m); }
				else if(m.Position & sandbox.constant.role.ALUMNUS) { this.alumni.push(m); }
				else if(m.Position & sandbox.constant.role.AFFILIATE) { this.affiliates.push(m); }
			}, this);

			this.setupGrid();
		}.bind(this))
		.catch(function (err) {
			console.error('Error: Cannot get members (', err, ')');
		})
		.done();
	};

	MemberListViewModel.prototype.getMembers = function () {
		var data, url;

        url = window.env.SERVER_HOST + '/member/list';
        data = { 
            apiKey: window.env.API_KEY, 
            select: ['FirstName', 'LastName', 'Position', 'Class', 'Family', 'Email', 'Phone']
        };

        return sandbox.http.get(url, data);
	};

	MemberListViewModel.prototype.setupGrid = function () {
		this.$selector.kendoGrid({
			dataSource: {
                data: this.actives(),
                schema: {
                    model: {
                        fields: {
                            FirstName: { type: "string" },
                            LastName: { type: "string" },
                            Class: { type: "string" },
                            Family: { type: "string" },
                            Position: { type: "number" },
                            Phone: { type: "string" },
                            Email: { type: "string" },
                        }
                    }
                },
                pageSize: 20
            },
            columns: [
                { field: "FirstName", title: "First Name"},
                { field: "LastName", title: "Last Name"},
                { field: "Class", title: "Class"},
                { field: "Family", title: "Family"},
                { field: "Position", title: "Position", template: this.formatPosition },
                { field: "Phone", title: "Phone"},
                { field: "Email", title: "Email"}
            ],
            filterable: {
            	extra: false
            },
            pageable: true,
            selectable: 'row',
            scrollable: false,
            sortable: true,
            change: function () {
            	// do something when selected
            }
		});
        
        this.makeGridResponsive();
	};

	MemberListViewModel.prototype.refreshGrid = function (newData) {
		var $grid = this.$selector.data('kendoGrid');
		$grid.dataSource.data(newData);
		$grid.refresh();
	};

	MemberListViewModel.prototype.switchToActives = function () {
		this.view('Active');
		this.refreshGrid(this.actives());
	};

	MemberListViewModel.prototype.switchToAlumni = function () {
		this.view('Alumnus');
		this.refreshGrid(this.alumni());
	};

	MemberListViewModel.prototype.switchToAffiliates = function () {
		this.view('Affiliate');
		this.refreshGrid(this.affiliates());
	};

    MemberListViewModel.prototype.formatPosition = function (dataItem) {
        var roles = role.getPositionRoles(dataItem.Position);
        return roles.join(", ");
    };

    MemberListViewModel.prototype.makeGridResponsive = function () {
        $(window).on("resize", function() {
            if ($(window).width() < 992) {
                this.$selector.data('kendoGrid').resize();
            }
        }.bind(this));
    };

	return MemberListViewModel;
});