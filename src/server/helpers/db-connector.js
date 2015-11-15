'use strict';

var pg = require('pg');

var db = function () {
    var connectionString = "postgres://db_admin:haiwashere99@localhost/family";
    this.client = new pg.Client(connectionString);
};

db.prototype.query = function (queryString, res) {
    var client = this.client;
    
    client.connect(function(err) {
        if (err) { return res.status(500).send('could not connect to postgres', err); }

        client.query(queryString, function(err, result) {
            if (err) { return res.status(500).send('error running query', err); }
            
            client.end();
            return result;
        });
    }); 

};

module.exports = db;