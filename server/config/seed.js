/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// User Seeding
var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    firstName: 'Hai',
    lastName: 'Huynhlam',
    role: 'admin',
    email: 'hhuynhlam@gmail.com',
    address: '159 Hornfels Ave.',
    homePhone: '209-234-3907',
    cellPhone: '408-623-2254',
    password: 'algebra1'
  }, {
    provider: 'local',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@admin.com',
    address: '159 Hornfels Ave.',
    homePhone: '111-222-3333',
    cellPhone: '222-444-6666',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

// Event Seeding
var Event = require('../api/event/event.model');

Event.find({}).remove(function() {
  Event.create({
    title: 'Event Title 1',
    allDay: false,
    start: new Date('January 2, 2015 10:00 AM'),
    end: new Date('January 2, 2015 10:30 AM'),
    url: null,
    className: null
  }, {
    title: 'Event Title 2',
    allDay: false,
    start: new Date('January 3, 2015 10:00 AM'),
    end: new Date('January 3, 2015 10:30 AM'),
    url: null,
    className: null
  }, function() {
      console.log('finished populating events');
    }
  );
});