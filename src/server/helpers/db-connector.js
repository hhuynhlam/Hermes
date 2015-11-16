'use strict';

var pg = require('pg');

var connectionString = process.env.FAMILY_DB;

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