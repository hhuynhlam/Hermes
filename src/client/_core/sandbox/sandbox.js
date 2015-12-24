'use strict';

import app from './app/app';
import auth from './auth/auth';
import cookie from './cookie/cookie';
import date from './date/date';
import http from './http/http';
import msg from './msg/msg';
import promise from './promise/promise';
import util from './util/util';

var sandbox = {
    app: app,
    auth: auth,
    cookie: cookie,
    date: date,
    http: http,
    msg: msg,
    promise: promise,
    util: util
};
    
export default sandbox;