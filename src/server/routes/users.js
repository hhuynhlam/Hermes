'use strict';

var db = require('../helpers/db-connector');
var qb = require('../helpers/query-builder');
var express = require('express');
var router = express.Router();

//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/',
function (req, res) {
    var queryString = qb(req.body);
    db.query(queryString, function(res) {
        console.log(res);
    });
});


module.exports = router;
