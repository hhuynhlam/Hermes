'use strict';

var _ = require('lodash');
var db = require('../helpers/db_connector');
var queryBuilder = require('../helpers/query_builder');
var express = require('express');
var router = express.Router();

//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.post('/',
function (req, res) {
    var queryString = queryBuilder( _.assign(req.body, { route: 'Users' }) );
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});


module.exports = router;
