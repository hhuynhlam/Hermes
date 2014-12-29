'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  allDay: Boolean,
  info: String,
  start: Date,
  end: Date,
  url: String,
  className: String
});

module.exports = mongoose.model('Event', EventSchema);