'use strict';

var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();

var Countries;


//======================================
// Mock
//======================================

var countryFile = 'src/server/_mock/Countries.json';
jsonfile.spaces = 4;
jsonfile.readFile(countryFile, function(err, data) {
    if (err) { console.error(err); }
    else { Countries = data; }
});


//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/',
function (req, res) {
    return res.status(200).json(Countries);
});

module.exports = router;
