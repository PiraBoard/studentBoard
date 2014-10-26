'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);

router.get('/userGroups', auth.isAuthenticated(), controller.getAllUserGroups);
router.post('/userGroup/:group', controller.createGroup);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/update', auth.isAuthenticated(), controller.updateProfile);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

router.get('/loginWithInvitation/:authString', controller.loginWithInvitation);
router.post('/createManyUsers', controller.createManyUsers);

router.get('/getUsersOfGroup/:group', auth.isAuthenticated(), controller.getUsersOfGroup);
router.get('/getActiveUsersOfGroup/:group', auth.isAuthenticated(), controller.getActiveUsersOfGroup);
router.get('/getInvitedUsersOfGroup/:group', auth.isAuthenticated(), controller.getInvitedUsersOfGroup);

module.exports = router;
