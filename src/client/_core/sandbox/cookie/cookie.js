'use strict';

import cookies from 'js-cookie';

var cookie = {
    get: cookies.get,
    set: cookies.set,
    remove: cookies.remove
};

export default cookie;
