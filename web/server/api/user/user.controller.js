'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var validationError = function(res, err) {
  return res.json(422, err);
};

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'andrewjteich@gmail.com', //*** NEED TO CHANGE THIS ***
        pass: 'vztuyeiymkqzusbe' // *** NEED TO HIDE THIS!!!!!!!!!!!!!!!!!!! ***
    }
});

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Send Invite Email
 */
exports.sendInvite = function (req, res, next) {
  console.log('inside send invite Express.js');
  var userId = req.params.id;

  //User.findById(userId, function (err, user) {
    // if (err) return next(err);
    // if (!user) return res.send(401);

    //generate unique url for user's initial login
    var uniqueUrl = 'localhost:9000/invitation/' + _generateAuthString(userId);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Master Pira <noreply@piraboard.com>',
        to: 'andrewjteich@gmail.com, andrewteich@me.com', // list of receivers - *** change to user.email ***
        subject: 'Hello', // Subject line
        //text: 'Copy and paste this link into your web browser to join: ' + uniqueUrl,
        //html: '<a href="' + uniqueUrl + '">Click Here to Join!</a>'
        text: 'Username: ' + '',
        html: ''
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
    res.send(200);
  //});
};

/**
  * Login Using Email Invitation
  */
exports.loginWithInvitation = function (req, res, next) {
  var authString = req.params.authString;

  //get users id from parameters
  var userId = _parseAuthString(authString);

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);

    //Found a matching user!
    //Send to some create a user page in Angular
    res.json(user.profile);
  });
};

/**
  * Create a string of parameters to use in invitation emails 
  */
var _generateAuthString = function(userId){
  //test
  // userId = 'WOW_IT_WORKED!';
  //end test

  //get random string to instert userId parts into
  var authString = _randomString(userId.length*6);
  authString = authString.split('');

  //place userId parts in authString
  for(var i=0; i<userId.length; i++){
    authString[i*3] = userId.charAt(i);
  }
  return authString.join('');
};

/**
  * Parse a string of parameters to use in login from invitation emails
  * Returns a userId
  */
var _parseAuthString = function(authString){
  // return authString.slice(9,authString.length-13);
  var userId = '';
  for(var i=0; i<authString.length/2; i+=3){
    userId += authString.charAt(i);
  }
  return userId;
};

/**
  * Generate a random string for use in
  * obfuscating userId in invitation email URLs
  */
var _randomString = function(length){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i=0; i<length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
