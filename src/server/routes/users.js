'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;

// mock
var Users = require('../_mock/Users.json');
var localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordFIeld: 'password',
    session: true
}, function(email, password, done) {
    var _user = _.find(Users, function (u) {
        return u.email === email && u.password === password;
    });

    if (!_user) { return done(null, false); }
    else { return done(null, _user); }
});

// configure auth strategy
passport.use(localStrategy);

/* GET users listing. */
router.post('/', function (req, res) {
    passport.authenticate('local', function (err, user) {
        if(err) { return res.status(500).json(err); }
        if(!user) { return res.status(401).json(err); }
        res.cookie('_user', JSON.stringify(user), 1, req.host);
        return res.status(200).json(user);
    })(req, res);
});

module.exports = router;
