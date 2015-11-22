'use strict';

var _ = require('lodash');
var express = require('express');
var jsonfile = require('jsonfile');
// var passport = require('passport');
var router = express.Router();

var Users;


//======================================
// Mock
//======================================

var userFile = 'src/server/_mock/data/Users.json';
jsonfile.spaces = 4;
jsonfile.readFile(userFile, function(err, data) {
    if (err) { console.error(err); }
    else { Users = data; }
});


//======================================
// Routes
//======================================

// List all Users
// router.get('/', passport.authenticate('local', { session: false }),
router.post('/',
function (req, res) {
    return res.status(200).json(Users);
});

// Create a User
router.put('/',
function (req, res) {
    var prevUser = _.last(Users),
        index = (prevUser) ? parseInt(prevUser.id) + 1 : 1,
        user;
    
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('Error: Missing email or password.');
    
    } else if ( _.find(Users, function (u) { return u.email === req.body.email ; })) {
        return res.status(400).send('Error: Email already in use.');
    
    } else {
        user = { id: index.toString() };
        user = _.assign(user, req.body);
        Users.push(user);

        jsonfile.writeFile(userFile, Users, function (err) {
            if (err) { return res.status(500).send('Error: ' + err); }
            else { return res.status(201).json(user); } 
        });
    }
});

// Get a User by id
router.post('/:id',
function (req, res) {
    var user = _.find(Users, function (u) {
        return u.id === req.params.id;
    });

    return (user) ? res.status(200).json(user) : res.status(404).send('No User Found.');
});

// Update a User by id
router.put('/:id',
function (req, res) {
    var userIndex = _.findIndex(Users, function (u) { 
        return u.id === req.params.id; 
    });
    
    if (userIndex < 0) {
        return res.status(404).send('No User Found.');
    } else {
        Users[userIndex] = _.assign(Users[userIndex], req.body);
        jsonfile.writeFile(userFile, Users, function (err) {
            if (err) { return res.status(500).send('Error: ' + err); }
            else { return res.status(201).json(Users[userIndex]); } 
        });
    }
});

// Delete a User by id
router.delete('/:id',
function (req, res) {
    var user = _.find(Users, function (u) {
        return u.id === req.params.id;
    });
    
    if (!user) {
        return res.status(404).send('No User Found.');
    } else {
         _.remove(Users, user);
        jsonfile.writeFile(userFile, Users, function (err) {
            if (err) { return res.status(500).send('Error: ' + err); }
            else { return res.status(200).send('User Delete Success.'); } 
        });
    }
});

module.exports = router;
