'use strict';

import alertWidget from 'alert.widget';
import buttonWidget from 'button.widget';
import dropdownWidget from 'dropdown.widget';
import gridWidget from 'grid.widget';
import inputWidget from 'input.widget';
import masonryWidget from 'masonry.widget';
import photoGridWidget from 'photogrid.widget';
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

        buttonWidget.create({
            id: 'SampleButton',
            label: 'Sample',
            attributes: [{
                type: 'submit'
            }],
            styles: [
                'btn-primary',
                'btn-block'
            ],
            subscribe: ['SampleButton.Sample']
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

        masonryWidget.create({
            id: 'SampleMasonry',
            itemClass: 'masonry-item',
            itemSelector: '.masonry-item',
            data: {
                transport: '/photos/albums/62'
            },
            columnWidth: 300,
            gutter: 5,
            isFitWidth: true,
            publish: {
                rendered: 'SampleMasonry.Rendered'
            }
        });

        photoGridWidget.create({
            id: 'SamplePhotoGrid',
            dataSource: { 
                transport: { 
                    read: {
                        type: 'GET',
                        url: '/photos/albums'  
                    }
                }
            },
            dataBound: function ($photoGrid, data) {
                data.forEach((album) => {

                    // append image to grid
                    $photoGrid.append('<div class="library-item"> \
                        <a href="/#/photos/album/' + album.pgid + '"> \
                        <img src="/photos?filePath=' + album.filePath + '&height=' + this.getResponsiveHeight() + '" /> \
                        <p class="text-center">' + album.groupName + '</p> \
                        </a></div>');
                });
            }           
        });

        windowWidget.create({
            id: 'SampleWindow',
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