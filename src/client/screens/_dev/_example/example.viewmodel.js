'use strict';

import alertWidget from 'alert.widget';
import dropdownWidget from 'dropdown.widget';
import gridWidget from 'grid.widget';
import inputWidget from 'input.widget';
import windowWidget from 'window.widget';

class ExampleViewModel {
    constructor() {}   

    init() {

        alertWidget.create({
            id: 'SampleAlert',
            subscribe: {
                error: 'Error',
                success: 'Success',
                info: 'Info',
                warning: 'Warning'
            }
        });

        dropdownWidget.create({
            id: 'SampleDropDown',
            dataTextField: 'name',
            dataValueField: 'id',
            dataSource: { 
                transport: { 
                    read: 'http://jsonplaceholder.typicode.com/users' 
                }
            }, 
            // change: ['ChangeTopicA'],
            // close: ['CloseTopicA'],
            // dataBound: ['DataBoundTopicA'],
            // filtering: ['FilteringTopicA'],
            // open: ['OpenTopicA'],
            // select: ['SelectTopicA'],
            cascade: ['CascadeTopicA'],
            subscribe: ['DropDownTopicB']
        });

        gridWidget.create({
            id: 'SampleGrid',
            dataSource: { 
                transport: { 
                    read: 'http://jsonplaceholder.typicode.com/users'  
                }
            },
            filterable: true,
            sortable: true,
            pageable: false,
            columns: [
                { field: "name", title: "Name"}, 
                { field: "username", title: "Username"},
                { field: "phone", title: "Phone"}
            ]
        });
        
        inputWidget.create({
            id: 'SampleInput',
            publish: ['InputTopicA'],
            subscribe: ['InputTopicB']
        });

        windowWidget.create({
            id: 'SampleModal',
            title: false,
            modal: true,
            visible: false,
            subscribe: {
                html: 'modal.html',
                open: 'modal.open',
                close: 'modal.close',
                center: 'modal.center'
            }
        });

    }
}

export default ExampleViewModel;