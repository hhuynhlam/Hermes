'use strict';

define(function (require) {
    var sandbox = require('sandbox');

    var role = {
        getAllRoles: function (position) {
            var roleType = sandbox.constant.role,
                roles = [];

            if (position & roleType.WEBMASTER) { roles.push('Webmaster'); }
            if (position & roleType.PRESIDENT) { roles.push('President'); }
            if (position & roleType.SERVICE_VP) { roles.push('Service VP'); }
            if (position & roleType.FELLOWSHIP_VP) { roles.push('Fellowship VP'); }
            if (position & roleType.MEMBERSHIP_VP) { roles.push('Membership VP'); }
            if (position & roleType.TREASURER) { roles.push('Treasurer'); }
            if (position & roleType.REC_SEC) { roles.push('Recording Secretary'); }
            if (position & roleType.COR_SEC) { roles.push('Corresponding Secretary'); }
            if (position & roleType.SAA) { roles.push('Sergeant at Arms'); }
            if (position & roleType.HISTORIAN) { roles.push('Historian'); }
            if (position & roleType.PLEDGE_PARENT) { roles.push('Pledge Parent'); }
            if (position & roleType.CRAZY_FAMILY_HEAD) { roles.push('Crazy Family Head'); }
            if (position & roleType.SEXY_FAMILY_HEAD) { roles.push('Sexy Family Head'); }
            if (position & roleType.COOL_FAMILY_HEAD) { roles.push('Cool Family Head'); }
            if (position & roleType.ACTIVE) { roles.push('Active'); }
            if (position & roleType.PLEDGE) { roles.push('Pledge'); }
            if (position & roleType.ALUMNUS) { roles.push('Alumnus'); }
            if (position & roleType.PROBATIONARY) { roles.push('Probationary'); }
            if (position & roleType.ASSOCIATE) { roles.push('Associate'); }
            if (position & roleType.AFFILIATE) { roles.push('Affiliate'); }
            if (position & roleType.ADVISOR) { roles.push('Advisor'); }
            if (position & roleType.INACTIVE) { roles.push('Inactive'); }
            if (position & roleType.FUNDRAISING) { roles.push('Fundraising'); }
            if (position & roleType.SPIRIT) { roles.push('Spirit'); }
            if (position & roleType.PUBLICITY) { roles.push('Publicity'); }
            if (position & roleType.ALUMNI_CHAIR) { roles.push('Alumni Chair'); }

            return roles;
        },

        getPositionRoles: function (position) {
            var roleType = sandbox.constant.role,
                roles = [];

            if (position & roleType.WEBMASTER) { roles.push('Webmaster'); }
            if (position & roleType.PRESIDENT) { roles.push('President'); }
            if (position & roleType.SERVICE_VP) { roles.push('Service VP'); }
            if (position & roleType.FELLOWSHIP_VP) { roles.push('Fellowship VP'); }
            if (position & roleType.MEMBERSHIP_VP) { roles.push('Membership VP'); }
            if (position & roleType.TREASURER) { roles.push('Treasurer'); }
            if (position & roleType.REC_SEC) { roles.push('Recording Secretary'); }
            if (position & roleType.COR_SEC) { roles.push('Corresponding Secretary'); }
            if (position & roleType.SAA) { roles.push('Sergeant At Arms'); }
            if (position & roleType.HISTORIAN) { roles.push('Historian'); }
            if (position & roleType.PLEDGE_PARENT) { roles.push('Pledge Parent'); }
            if (position & roleType.CRAZY_FAMILY_HEAD) { roles.push('Crazy Family Head'); }
            if (position & roleType.SEXY_FAMILY_HEAD) { roles.push('Sexy Family Head'); }
            if (position & roleType.COOL_FAMILY_HEAD) { roles.push('Cool Family Head'); }
            if (position & roleType.ADVISOR) { roles.push('Advisor'); }
            if (position & roleType.FUNDRAISING) { roles.push('Fundraising Coordinator'); }
            if (position & roleType.SPIRIT) { roles.push('Spirit Chair'); }
            if (position & roleType.PUBLICITY) { roles.push('Publicity Chair'); }
            if (position & roleType.ALUMNI_CHAIR) { roles.push('Alumni Chair'); }

            return roles;
        }
    };

    return role;
});