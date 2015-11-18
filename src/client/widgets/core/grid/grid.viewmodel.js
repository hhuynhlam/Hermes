'use strict';

import BaseWidgetViewModel from 'base-widget.viewmodel';
import 'k/kendo.grid.min';

class GridViewModel extends BaseWidgetViewModel {
  constructor(options) {
    super(options);

    this.options = options || {};
  }
  
  init() {
    this.setOptions();
    this.$selector.kendoGrid(this.options);
  }
  
  setOptions() {
    var _supportedEvents = [
      'cancel', 'change', 'columnHide', 'columnMenuInit', 'columnReorder',
      'columnResize', 'columnShow', 'dataBinding', 'dataBound', 'detailCollapse', 
      'detailExpand', 'detailInit', 'edit', 'excelExport', 'pdfExport',  
      'filterMenuInit', 'remove', 'save', 'saveChanges', 'columnLock',
      'columnUnlock', 'navigate'
    ];
    
    this.setupPublications(_supportedEvents);
    this.setupSubscriptions();
  }
}

export default GridViewModel;
