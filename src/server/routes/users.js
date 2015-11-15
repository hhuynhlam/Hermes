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
router.get('/',
function (req, res) {
    var queryString = queryBuilder(req.body);

    var data = db.query('select * from Users', res);
    return res.status(200).json( (data && data.length) ? data[0] : [] );
});


module.exports = router;
