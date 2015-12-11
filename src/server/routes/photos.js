'use strict';

var db = require('../helpers/db_connector');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var queryBuilder = require('../helpers/query_builder');
var express = require('express');
var path = require('path');
var router = express.Router();

//======================================
// Photos
//======================================

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
        _filePath = (fs.existsSync(filePath)) ? filePath : noFilePath,
    
        height = req.query.height,
        width = req.query.width,
        _img;

    // set image content-type
    res.set('Content-Type', 'image/jpg');

    _img = gm(_filePath).resize(width, height).gravity('Center');
    
    if (height) { _img = _img.extent(height); }

    _img.stream(function (err, stdout) {
        if (err) { res.status(500).send('Image Error: ' + err); }
        else { stdout.pipe(res); }
    }); 
});

//======================================
// Albums
//======================================

// List all albums
// router.get('/', passport.authenticate('local', { session: false }),
router.get('/albums',
function (req, res) {
    var queryString = queryBuilder.select({ route: 'vPhotoGroup' });
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// List all photos in album
// router.get('/', passport.authenticate('local', { session: false }),
router.post('/albums/:albumId',
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

// Create a new album
// router.get('/', passport.authenticate('local', { session: false }),
router.put('/albums',
function (req, res) {
    var queryParams = queryBuilder.params([
            'groupName'
        ], req.body ),
        queryString = 'CALL pCreatePhotoGroup(' + queryParams + ');';
    
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Update an album
// router.get('/', passport.authenticate('local', { session: false }),
router.put('/albums/:id',
function (req, res) {
    var queryParams = queryBuilder.params([
            'groupName'
        ], req.body ),
        queryString = 'CALL pUpdatePhotoGroup(\'' + req.params.id + '\', ' + queryParams + ');';
    
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Delete a User by id
router.delete('/albums/:id',
function (req, res) {
    var queryString = 'CALL pDeletePhotoGroup(\'' + req.params.id + '\'' + ');';
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

module.exports = router;
