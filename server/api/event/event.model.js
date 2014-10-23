'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  info: String,
  start: Date,
  end: Date
});

module.exports = mongoose.model('Event', EventSchema);