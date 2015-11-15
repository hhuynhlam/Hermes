'use strict';

var express = require('express');
var pg = require('pg');
var router = express.Router();

var connectionString = "postgres://db_admin:haiwashere@localhost/family";


//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/',
function (req, res) {
    var client = new pg.Client(connectionString),
        results;

    client.connect(function(err) {
        if (err) { return res.status(500).send('could not connect to postgres', err); }
        
        client.query('SELECT NOW() AS "theTime"', function(err, result) {
            
            if (err) { return res.status(500).send('error running query', err); }
            
            results = result.rows[0];
            client.end();

        });

        return res.status(200).json(results);
    });
});


module.exports = router;
