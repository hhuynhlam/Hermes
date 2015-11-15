'use strict';

var queryBuilder = require('../helpers/query-builder');
var express = require('express');
var router = express.Router();

var DB = require('../helpers/db-connector');
var db = new DB();

//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/',
function (req, res) {
    var queryString = queryBuilder(req.body);

    db.query('SELECT * FROM Users;', res, function (data) {
        return res.status(200).json( data.rows[0] );
    });
});


module.exports = router;
