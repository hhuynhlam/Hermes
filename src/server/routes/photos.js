'use strict';

var db = require('../helpers/db_connector');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var queryBuilder = require('../helpers/query_builder');
var express = require('express');
var path = require('path');
var router = express.Router();

//======================================
// Routes
//======================================

// List all Photos
// router.get('/', passport.authenticate('local', { session: false }),
router.post('/:albumId',
function (req, res) {
    var queryString = queryBuilder.select({ 
        route: 'vPhoto', 
        where: [
            { 'key': 'pgid', 'operator': '=', 'value': req.params.albumId }
        ]
    });
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Get a Photo by id
// router.get('/', passport.authenticate('local', { session: false }),
router.post('/:id',
function (req, res) {
    var queryString = queryBuilder.select({ 
        route: 'vPhoto', 
        where: [
            { 'key': 'pid', 'operator': '=', 'value': req.params.id }
        ]
    });
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Get Photo thumbnail
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/',
function (req, res) {
    var _public = path.join(__dirname, '../public'),
        filePath = _public + '/' + req.query.filePath,
        noFilePath = _public + '/images/404.png',
        height = req.query.height,
        width = req.query.width;

    // set image content-type
    res.set('Content-Type', 'image/jpg');

    if ( fs.existsSync(filePath) ) { 
        gm(filePath)
        .resize(width, height)
        .gravity('Center')
        .extent(height)
        .stream(function (err, stdout) {
            if (err) { res.status(500).send('Image Error: ' + err); }
            else { stdout.pipe(res); }
        }); 

    // error handling for 404 images
    } else {
        gm(noFilePath)
        .resize(width, height)
        .gravity('Center')
        .extent(height)
        .stream(function (err, stdout) {
            if (err) { res.status(500).send('Image Error: ' + err); }
            else { stdout.pipe(res); }
        }); 
    }
});

module.exports = router;
