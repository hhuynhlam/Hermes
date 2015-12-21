'use strict';

var db = require('../helpers/db_connector');
var express = require('express');
var jsonfile = require('jsonfile');
var queryBuilder = require('../helpers/query_builder');
var router = express.Router();

//======================================
// Routes
//======================================

    router.put('/',
    function (req, res) {

        // insert into db
        var queryParams = queryBuilder.params([
                'nType',
                'nTarget',
                'uid'
            ], req.body ),
            queryString = 'CALL pCreateNotification(' +  queryParams + ');';

        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
            
    });

    router.post('/',
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

    router.delete('/:id',
    function (req, res) {
        var queryString = 'CALL pDeleteNotification(' + req.params.id + ', NULL);';
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    router.delete('/:id/:type',
    function (req, res) {

        var queryString = 'CALL pDeleteNotification(' + req.params.id + ', \'' + req.params.type + '\');';
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

//======================================
module.exports = router;
