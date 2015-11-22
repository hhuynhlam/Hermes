'use strict';

var path = require('path');
var mysql = require('mysql');
var _config = require(path.resolve(__dirname, '../prod.config.json'));
var connection = mysql.createConnection(_config.db);

var db = {
    query: function (queryString, success, fail) {
        connection.connect();
        connection.query(queryString, function(err, rows, fields) {
            debugger;
            if (err) { fail.call(this, err); }
            else { success.call(this, rows); }
            connection.end();
        });
    }
};

module.exports = db;