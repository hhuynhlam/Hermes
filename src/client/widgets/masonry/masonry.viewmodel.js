'use strict';

import sandbox from 'sandbox';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry';

var http = sandbox.http;
var msg = sandbox.msg;

class MasonryViewModel {
    constructor(options) {
        this.$selector = $('#' + options.id);
        this.options = options || {};
    }

    init() {

        // retrieve data
        http.post( this.options.data.transport )
        .then((data) => {
            data.forEach((photo) => {
                
                // append image to masonry
                this.$selector.append('<div class="' + this.options.itemClass + '"> \
                    <img src="/photos?filePath=' + photo.filePath + '&width=' + this.options.columnWidth + '" /></div>');
            });

            // after all images loaded
            imagesLoaded('#' + this.options.id, () => {
                
                // rerender layout
                this.$photoMasonry = new Masonry('#' + this.options.id, this.options);

                if (this.options.publish && this.options.publish.rendered) {
                    msg.publish(this.options.publish.rendered, true);
                }
            });
        })
        .catch(() => {
            console.error('Image Retrieval Error - Please try again later.');
        })
        .done();  
    }
}


export default MasonryViewModel;
