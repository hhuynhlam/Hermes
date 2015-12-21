'use strict';

var db = require('../helpers/db_connector');
var queryBuilder = require('../helpers/query_builder');
var express = require('express');
var router = express.Router();

//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.post('/',
function (req, res) {
    var queryString = queryBuilder.select({ route: 'Users' });
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Create a User
// router.get('/', passport.authenticate('local', { session: false }),
router.put('/',
function (req, res) {
    var queryParams = queryBuilder.params([
            'firstName', 
            'lastName',
            'streetAddress',
            'country',
            'state',
            'city',
            'zip',
            'primaryNumber',
            'secondaryNumber',
            'pid',
            'email',
            'password'
        ], req.body ),
        queryString = 'CALL pCreateUser(' + queryParams + ');';
    
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Get all of User uploaded photos
router.post('/photos/:id',
function (req, res) {
    var queryString = queryBuilder.select({ 
        route: 'vPhoto',  
        where: [
            { 'key': 'uid', 'operator': '=', 'value': req.params.id }
        ]
    });
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Get a User by id
router.post('/:id',
function (req, res) {
    var queryString = queryBuilder.select({ 
        route: 'Users',  
        where: [
            { 'key': 'uid', 'operator': '=', 'value': req.params.id }
        ]
    });
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Update a User by id
router.put('/:id',
function (req, res) {
    var queryParams = queryBuilder.params([
            'firstName', 
            'lastName',
            'streetAddress',
            'country',
            'state',
            'city',
            'zip',
            'primaryNumber',
            'secondaryNumber',
            'pid',
            'email',
            'password'
        ], req.body ),
        queryString = 'CALL pUpdateUser(\'' + req.params.id + '\', ' + queryParams + ');';
    
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});

// Delete a User by id
router.delete('/:id',
function (req, res) {
    var queryString = 'CALL pDeleteUser(\'' + req.params.id + '\'' + ');';
    db.query(queryString, function (data) {
        return res.status(200).json( data );
    }, function (err) { res.status(500).send('SQL Error: ' + err); });
});


module.exports = router;
