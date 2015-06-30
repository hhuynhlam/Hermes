'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/address', auth.isAuthenticated(), controller.changeAddress);
router.put('/:id/homePhone', auth.isAuthenticated(), controller.changeHomePhone);
router.put('/:id/cellPhone', auth.isAuthenticated(), controller.changeCellPhone);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
