/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    firstName: 'Hai',
    lastName: 'Huynhlam',
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