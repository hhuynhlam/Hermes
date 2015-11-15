'use strict';

var pg = require('pg');
var connectionString = "postgres://db_admin:haiwashere99@localhost/family";

var client = new pg.Client(connectionString),
    results;

var db {
        query = function (queryString, callback) {

        client.connect(function(err) {
            if (err) { return res.status(500).send('could not connect to postgres', err); }
            
            client.query(queryString, function(err, result) {
                if (err) { return res.status(500).send('error running query', err); }
                
                client.end();
                callback.call(result);
            });
        }); 

    }
};

module.exports = db;