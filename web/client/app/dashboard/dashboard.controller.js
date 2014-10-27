'use strict';

angular.module('piraBoardApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth, Modal, User, Group, $timeout) {
    $scope.currentgroup = [];
    $scope.mygroups = [];
    $scope.numgroup = $scope.mygroups.length;

    //When groups are added, they are also added here with their $scope.groups index
    $scope.groupIndexFromName = {}
    $scope.groups = [];
    $scope.numberGroups = 0;
    $scope.numberLead = 0;
    $scope.numGroups = $scope.groups.length;
    $scope.addGroupToggle = false; 
    $scope.profileToggle = false;
    $scope.infoBoxToggle = false;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentGroup = {}; // currently selected group

    // inits some important properties
    User.get().$promise.then( function (result) {
      $scope.numberGroups = result.group.length;
      $scope.usersGroups = result.group;
      return result;
    });

    // gets the current group the user is clicked on
    $scope.getGroup = function (index) {
      $scope.infoBoxToggle = true;
      Group.getAllMembers($scope.usersGroups[index]).$promise.then(function (result) {
        var master = [];
        for (var i = 0; i < result.length; i++) {
          console.log(i);
          var store = result[i];
          var member = {
            name: store.name,
            email: store.email,
            phonenumber: store.phonenumber,
            location: store.location,
            bio: store.bio,
            photo: store.photo,
            isAdmin: store.isAdmin,
            _id: store._id
          };
          master.push(member);
        }
        master.groupName = $scope.usersGroups[index];
        $scope.currentGroup = master;
        console.log(master);
        return master;
      });
    };

    $scope.createGroup = function (name, callback) {
      //Don't create groups that already exist
      // var group = new Group.create();
      // group.name = name;
      // Group.create.save({name:group}, function () {});

      if($scope.usersGroups.indexOf(name) < 0) {
      // make group in database and add group to list on success
      console.log('hello there');
      $scope.numberLead++;
      User.get().$promise.then(function (obj) {
        console.log(obj);
        $http.post('/api/users/userGroup/' + name, {user: obj})
        .success(function(data) {
          console.log('data posted', data);
          $scope.groupName = '';
          $scope.addGroupToggle = false;

          _addGroupToLocal(name);

          if(callback){
            console.log('callback')
            callback($scope.numGroups);
          }
        })
      });
    }
  };

    var _addGroupToLocal = function(name){
      $scope.groupIndexFromName[name] = $scope.numGroups;
      $scope.groups[$scope.numGroups] = 
      {
        groupName:name,
        members: [],
        invitations: []
      };
      $scope.numGroups++;
    };

    $scope.addGroupMembers = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];

      for(var i=0; i<members.length; i++){
        $scope.groups[index].members.push(members[i]); 
      }
    };

    $scope.setGroupMembers = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];
      $scope.groups[index].members = members; 
    };

    $scope.addGroupInvitations = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];

      for(var i=0; i<members.length; i++){
        $scope.groups[index].invitations.push(members[i]); 
      }
    };

    $scope.setGroupInvitations = function(groupName, members){
      var index = $scope.groupIndexFromName[groupName];
      $scope.groups[index].invitations = members; 
    };

    $scope.isCurrentGroup = function (group) {
      return $scope.currentGroup.groupName === group;
    };

    $scope.updateGroupsFromServer = function (callback) {
      $http.get('/api/users/userGroups')
      .success(function(data){
       $scope.groupNames = data;
        if(data){
          for(var i=0; i<data.length; i++){
            var groupName = data[i];
            if(!$scope.groups[groupName]){
              console.log('add ' + groupName + ' to local');
              _addGroupToLocal(groupName);
            }
          }
          if(callback){
            callback();
          }
        }
      })
      .error(function(err){
        console.log(err);
      });
    };

    $scope.getCurrentGroup = function (group) {
      console.log(group);
       $http.get('/api/users/getUsersOfGroup/' + group)
       .success(function (data) {
        $scope.currentgroup = data;
      }); 
     console.dir($scope.currentgroup);
    };
    
    $scope.initPiraBoard = function (data) {
      return Modal.app(data);
    }

    $scope.updateGroupsFromServer($scope.getUsersGroups);
  });