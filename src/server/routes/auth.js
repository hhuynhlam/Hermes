'use strict';

var db = require('../helpers/db-connector');
var express = require('express');
var passport = require('passport');
var queryBuilder = require('../helpers/query-builder');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;

var localStrategy;

//======================================
// Local Strategy
//======================================

localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordFIeld: 'password',
    session: true
}, function(email, password, done) {
    var queryString = queryBuilder({ email: email, password: password, route: 'Users' });
    db.query(queryString, function (data) {
        var _user = (data && data.length) ? data[0] : [];
        return (!_user) ? done(null, false) : done(null, _user);
    }, function () { return done(null, false); });
});

passport.use(localStrategy);


//======================================
// Routes
//======================================

router.post('/login', function (req, res) {
    passport.authenticate('local', function (err, user) {
        if(err) { return res.status(500).json(err); }
        if(!user) { return res.status(401).json(err); }
        
        res.cookie('_user', JSON.stringify(user), 1, req.hostname);
        return res.status(200).json(user);
    })(req, res);
});

router.get('/logout', function (req, res) {
    req.logOut();
    res.clearCookie('_user', { path: '/' });
    res.redirect('/#/login');
});

module.exports = router;
