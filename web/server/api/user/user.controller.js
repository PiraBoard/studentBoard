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
        pass: 'uzacadtodacnrkoz' // *** NEED TO HIDE THIS!!!!!!!!!!!!!!!!!!! ***
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
  //make sure they have a password, 
  // if not create a temporary one for them
  var newInvitation = false;
  if(!req.body.password){
    req.body.password = 'password';
    req.body.active = false;
    newInvitation = true;
  }

  createUser(req.body, function(err, user) {
    if (err) return validationError(res, err);
    if(!newInvitation){
      var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.json({ token: token });
    } else {
      res.json('Added new user for invitation');
      //send invitation email here
      sendInvitation(user);
    }
  });
};

//Modularity, FTW
var createUser = function(userData, callback){
  //check if user already exists
  // console.log(userData);
  User.find({email: userData.email}, function (err, users) {
    // if (err) return next(err);
    // if (!user) return res.send(401);
    var user = users[0];
    if(user){
      console.log('user mongoose: ', user);
      // var groups = [user.group];
      if(user.group !== userData.group){
        user.group.push(userData.group);
        // user.group = groups;
        user.save(function(err, user){
          //error, createdUser, userAlreadyExists
          callback(err, user, true);
          console.log('added group ' + userData.group + ' to ' + user.name);
        });
      }
    } else {
      
      // console.log('creating a new user')
      var newUser = new User(userData);
      console.log(userData);
      newUser.provider = 'local';
      newUser.role = 'user';

      newUser.save(function(err, createdUser){
        callback(err, createdUser);
        // sendInvitation(createdUser);
      });
    }
  });

};

/**
  * Create a batch of users
  */
exports.createManyUsers = function(req, res, next){
  var newUsers = req.body.users;
  var usersAdded = [];

  for(var i=0; i<newUsers.length; i++){
    var newUser = JSON.parse(newUsers[i]);
    // console.log(newUser);
    createUser(newUser, function(err, user, existedAlready) {
      if (err){
        console.log('error adding users: ', err);
      } else if(!existedAlready) {
        usersAdded.push(user);

        if(usersAdded.length === req.body.users.length){
          res.json(usersAdded);
        }
      }
    });
  }
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

var sendInvitation = function(user){
  //generate unique url for user's initial login
  console.log('sending invitation to user id: ', user._id);
  var uniqueUrl = 'localhost:9000/invitation/' + _generateAuthString(user._id);
  console.log('url: ', uniqueUrl);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Master Pira <noreply@piraboard.com>',
      to: user.email,
      subject: 'Welcome to PiraBoard!', // Subject line
      text: 'Copy and paste this link into your web browser to join: ' + uniqueUrl,
      html: 'Hi ' + user.name + ',<br><br><a href="' + uniqueUrl + '">Click Here to Join!</a><br><br><p>Sincerely,<br>The PiraBoard Team</p>'
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
};

/* DEPRECATED */
// exports.sendInvite = function (req, res, next) {
//   console.log('inside send invite Express.js');
//   var userId = req.params.id;
//   sendInvitation(userId);

//   //User.findById(userId, function (err, user) {
//     // if (err) return next(err);
//     // if (!user) return res.send(401);

    
//     res.send(200);
//   //});
// };

/**
  * Login Using Email Invitation
  */
exports.loginWithInvitation = function (req, res, next) {
  var authString = req.params.authString;
  console.log('login with invitation id: ', authString);

  //get users id from parameters
  var userId = _parseAuthString(authString);

  console.log('parsed id: ', userId);

  // res.json('kill for testing, fix later');

  //User.findById(userId, function (err, user) {
  User.findById(userId, function (err, user){
    console.log('Error: ', err, ' User: ', user);
    
    //*** not finding a user... ***

    if (err) return next(err);
    if (!user) return res.send(401);

    // var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    // res.json({ token: token });
    res.json(user);
    //Found a matching user!
    //Send to some create a user page in Angular
    // res.json(user);
  });
};

/**
  * Create a string of parameters to use in invitation emails 
  */
var _generateAuthString = function(userId){
  userId += ''; //stringify

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
  {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

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
      user.active = true;
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
 * Updates the user's profile
 */
exports.updateProfile = function(req, res, next) {
  var userId = req.user._id;
  var profile = req.body.profile;
  // next, parse the profile information
  User.findById(userId, function (err, user) {
    if (user) {
      user.name = String(profile.name) || user.name;
      user.email = String(profile.email) || user.email;
      user.phonenumber = String(profile.phonenumber) || user.phonenumber;
      user.location = String(profile.location) || user.location;
      user.photo = String(profile.photo) || user.photo;
      user.bio = String(profile.bio) || user.bio;

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
  * Gets all users in a group
  */
exports.getUsersOfGroup = function(req, res, next){
  var group = req.params.group;//, name:{'$ne':'admin'}
  User.find( { group:group }, '-salt -hashedPassword', function (err, users) {
    if(err){
      console.log('server - user.controller - getUsersOfGroup - ', err);
    }
    res.json(users);
  });
};

exports.getActiveUsersOfGroup = function(req, res, next){
  var group = req.params.group;      //, name:{'$ne':'admin'} 
  User.find( { group:group, active:true }, '-salt -hashedPassword', function (err, users) {
    if(err){
      console.log('server - user.controller - getActiveUsersOfGroup - ', err);
    }
    res.json(users);
  });
};

exports.getInvitedUsersOfGroup = function(req, res, next){
  var group = req.params.group;//, name:{'$ne':'admin'}
  User.find( { group:group, active:false  }, '-salt -hashedPassword', function (err, users) {
    if(err){
      console.log('server - user.controller - getInvitedUsersOfGroup - ', err);
    }
    res.json(users);
  });
};

/**
  * Get a list of all groups
  */
exports.getAllUserGroups = function(req, res, next){
  console.log('getAllGroups');
  User.distinct('group', function(err, data){

    res.json(200, data);
  });
};

/**
  * Create a new group
  */
exports.createGroup = function(req, res){
  var group = req.params.group;
  createUser({name:'Admin', group:group, password:'admin'}, function(err, user){
    if(err){
      console.log('error creating group - ', err);
    }
    res.json(200, user.group);
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
