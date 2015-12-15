'use strict';

import _ from 'lodash';
import q from 'q';

var promise = {

};

// merge _ with custom utils
promise = _.assign( q, promise );

export default promise;
