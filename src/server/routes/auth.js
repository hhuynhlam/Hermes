'use strict';

var _ = require('lodash');
var express = require('express');
var jsonfile = require('jsonfile');
var passport = require('passport');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;

var localStrategy,
    Users;


//======================================
// Mock
//======================================

jsonfile.readFile('src/server/_mock/Users.json', function(err, data) {
    if (err) { console.error(err); }
    else { Users = data; }
});


//======================================
// Local Strategy
//======================================

localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordFIeld: 'password',
    session: true
}, function(email, password, done) {
    var _user = _.find(Users, function (u) {
        return u.email === email && u.password === password;
    });

    return (!_user) ? done(null, false) : done(null, _user);
});

passport.use(localStrategy);


//======================================
// Routes
//======================================

router.post('/login', function (req, res) {
    passport.authenticate('local', function (err, user) {
        if(err) { return res.status(500).json(err); }
        if(!user) { return res.status(401).json(err); }
        
        res.cookie('_user', JSON.stringify(user), 1, req.host);
        return res.status(200).json(user);
    })(req, res);
});

router.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
