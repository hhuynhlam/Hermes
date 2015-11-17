'use strict';

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var auth = (app.get('env') === 'production') ? require('./routes/auth') : require('./routes/auth_mock');
var countries = require('./routes/countries');
var index = require('./routes/index');
var states = require('./routes/states');
var users = (app.get('env') === 'production') ? require('./routes/users') : require('./routes/users_mock');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set path for static resources
app.use( '/public', express.static(path.join(__dirname, 'public')) );
app.use( express.static(path.resolve(__dirname, '../client')) );

app.use('/', index);
app.use('/auth', auth);
app.use('/countries', countries);
app.use('/users', users);
app.use('/states', states);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
