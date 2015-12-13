'use strict';

import BaseWidgetViewModel from 'base-widget.viewmodel';
import 'k/kendo.upload.min';

class UploadViewModel extends BaseWidgetViewModel {
  constructor(options) {
    super(options);

    this.options = options || {};
  }
  
  init() {
    this.setOptions();
    this.$selector.kendoUpload(this.options);
  }
  
  setOptions() {
    var _supportedEvents = [
      'cancel', 'complete', 'error', 'progress', 'remove',
      'select', 'success', 'upload'
    ];
    
    this.setupPublications(_supportedEvents);
    this.setupSubscriptions();
  }
}

export default UploadViewModel;
