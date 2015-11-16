'use strict';

var pg = require('pg');

var connectionString = process.env.FAMILY_DB;
var client = new pg.Client(connectionString);

var db = {
    query: function (queryString, success, fail) {
        client.connect(function(err) {
            if (err) { fail.call(this, err); }

            client.query(queryString, function(err, result) {
                if (err) { fail.call(this, err); }

                client.end();
                if (result) { success.call(this, result); }
            });
        }); 
    }
};

module.exports = db;