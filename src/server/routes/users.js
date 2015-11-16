'use strict';

var db = require('../helpers/db-connector');
var queryBuilder = require('../helpers/query-builder');
var express = require('express');
var router = express.Router();

//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.post('/',
function (req, res) {
    var queryString = queryBuilder(req.body);
    db.query(queryString, function (data) {
        var result = (data && data.length) ? data[0] : [];
        return res.status(200).json( result );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});


module.exports = router;
