'use strict';

var db = require('../helpers/db_connector');
var queryBuilder = require('../helpers/query_builder');
var express = require('express');
var router = express.Router();

//======================================
// Routes
//======================================

    // Create a Comment
    // router.get('/', passport.authenticate('local', { session: false }),
    router.put('/',
    function (req, res) {
        var queryParams = queryBuilder.params([
                'pid', 
                'uid',
                'pComment'
            ], req.body ),
            queryString = 'CALL pCreatePhotoComment(' + queryParams + ');';
        
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Get all comments by Photo Id
    router.post('/photos/:id',
    function (req, res) {
        var queryString = queryBuilder.select({ 
            route: 'vPhotoComment',  
            where: [
                { 'key': 'pid', 'operator': '=', 'value': req.params.id }
            ]
        });
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Update a Comment by id
    router.put('/:id',
    function (req, res) {
        var queryParams = queryBuilder.params([
                'pid', 
                'uid',
                'pComment'
            ], req.body ),
            queryString = 'CALL pUpdatePhotoComment(\'' + req.params.id + '\', ' + queryParams + ');';
        
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Delete a Comment by id
    router.delete('/:id',
    function (req, res) {
        var queryString = 'CALL pDeletePhotoComment(\'' + req.params.id + '\'' + ');';
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

//======================================

module.exports = router;
