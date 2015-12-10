'use strict';

import photoGridWidget from 'photogrid.widget';

class LibraryViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init() {        
        this._createWidgets();
        this._setupEvents();        
    }



    _createWidgets() {
        photoGridWidget.create({
            id: 'LibraryGrid',
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
    }

    _setupEvents() {

    }
}

export default LibraryViewModel;