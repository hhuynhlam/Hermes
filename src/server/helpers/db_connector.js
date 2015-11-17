'use strict';

var path = require('path');
var _config = require(path.resolve(__dirname, '../prod.config.json'));
var pg = require('pg');

var connectionString = _config.connectionString;

var db = {
    query: function (queryString, success, fail) {
        pg.connect(connectionString, function(err, client, done) {
            var results = [],
                query;

            // Handle connection errors
            if(err) {
                done();
                fail.call(this, err);
            }

            // SQL Query
            query = client.query(queryString);

            // // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                success.call(this, results);
            });


        });
    }
};

module.exports = db;