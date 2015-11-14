'use strict';

var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();

var States;


//======================================
// Mock
//======================================

var stateFile = 'src/server/_mock/States.json';
jsonfile.spaces = 4;
jsonfile.readFile(stateFile, function(err, data) {
    if (err) { console.error(err); }
    else { States = data; }
});


//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/',
function (req, res) {
    return res.status(200).json(States);
});

module.exports = router;
