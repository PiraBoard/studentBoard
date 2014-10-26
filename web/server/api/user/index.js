'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//Removed Admin Check for Root '/' Get Requests
// router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/update', auth.isAuthenticated(), controller.updateProfile);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

router.put('/:id/invite', auth.hasRole('admin'), controller.sendInvite);
router.get('/loginWithInvitation/:authString', controller.loginWithInvitation);
router.post('/createManyUsers', controller.createManyUsers);

router.get('/getUsersOfGroup/:group', auth.isAuthenticated(), controller.getUsersOfGroup);

module.exports = router;
