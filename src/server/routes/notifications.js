'use strict';

var db = require('../helpers/db_connector');
var express = require('express');
var jsonfile = require('jsonfile');
var queryBuilder = require('../helpers/query_builder');
var router = express.Router();

//======================================
// Routes
//======================================

    // Create Notification
    router.put('/',
    function (req, res) {

        // insert into Notifications db
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

    // Get Notifications
    router.post('/',
    function (req, res) {

        var whereArray = [];

        var uidHash = {
              'key': 'uid',
              'operator': '=',
              'value': req.body.userId
        };
        whereArray.push(uidHash);

        if (req.body.type) {
            var typeHash = {
                'key': 'nType',
                'operator': '=',
                'value': req.body.type
            };
            whereArray.push(typeHash);
        }

        var queryString = queryBuilder.select({ 
            route: 'Notifications', 
            where: whereArray 
        });
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Delete Notifications
    router.delete('/:id',
    function (req, res) {
        var queryString = 'CALL pDeleteNotification(' + req.params.id + ', NULL);';
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Delete Notifications by type
    router.delete('/:id/:type',
    function (req, res) {

        var queryString = 'CALL pDeleteNotification(' + req.params.id + ', \'' + req.params.type + '\');';
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

//======================================
module.exports = router;
