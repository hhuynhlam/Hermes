'use strict';

var db = require('../helpers/db_connector');
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
router.post('/',
function (req, res) {
    var queryString = queryBuilder.select({ route: 'vPhoto', limit: 25 });
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
        height = req.query.height,
        width = req.query.width;

    // set image content-type
    res.set('Content-Type', 'image/jpg');

    gm(filePath)
    .resize(width, height)
    .stream(function (err, stdout) {
        if (err) { res.status(500).send('Image Error: ' + err); }
        else { stdout.pipe(res); }
    });
});

// // Create a User
// // router.get('/', passport.authenticate('local', { session: false }),
// router.put('/',
// function (req, res) {
//     var queryParams = queryBuilder.params([
//             'firstName', 
//             'lastName',
//             'streetAddress',
//             'country',
//             'state',
//             'city',
//             'zip',
//             'homePhone',
//             'mobilePhone',
//             'email',
//             'password'
//         ], req.body ),
//         queryString = 'CALL pCreateUser(' + queryParams + ');';
    
//     db.query(queryString, function (data) {
//         return res.status(200).json( data );
//     }, function (err) { res.status(500).send('SQL Error: ' + err); });
// });

// // Update a User by id
// router.put('/:id',
// function (req, res) {
//     var queryParams = queryBuilder.params([
//             'firstName', 
//             'lastName',
//             'streetAddress',
//             'country',
//             'state',
//             'city',
//             'zip',
//             'homePhone',
//             'mobilePhone',
//             'email',
//             'password'
//         ], req.body ),
//         queryString = 'CALL pUpdateUser(\'' + req.params.id + '\', ' + queryParams + ');';
    
//     db.query(queryString, function (data) {
//         return res.status(200).json( data );
//     }, function (err) { res.status(500).send('SQL Error: ' + err); });
// });

// // Delete a User by id
// router.delete('/:id',
// function (req, res) {
//     var queryString = 'CALL pDeleteUser(\'' + req.params.id + '\'' + ');';
//     db.query(queryString, function (data) {
//         return res.status(200).json( data );
//     }, function (err) { res.status(500).send('SQL Error: ' + err); });
// });


module.exports = router;
