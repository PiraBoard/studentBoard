'use strict';

angular.module('piraBoardApp')
.controller('DashboardCtrl', function ($scope, $http, $q, Auth, Modal, User, Group) {
  $scope.currentgroup = [];
  $scope.mygroups = [];
  $scope.numgroup = $scope.mygroups.length;
    // inits some important properties
    User.get().$promise.then( function (result) {
      console.log('result', result)
      $scope.numberGroups = result.group.length;
      $scope.usersGroups = result.group;
      console.log($scope.usersGroups);
      return result;
    });

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

    // gets the current group the user is clicked on
    $scope.getGroup = function (index) {
      $scope.infoBoxToggle = true;
      Group.getAllMembers($scope.usersGroups[index]).$promise.then(function (result) {
        var master = [];
        for (var i = 0; i < result.length; i++) {
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
        return master;
      });
    };

    $scope.createGroup = function (name, callback) {
      var user = User.get().$promise;
      var groups = $http.get('/api/users/userGroups');
      $q.all([user, groups]).then(function (result) {
        var user = result[0];
        var groups = result[1].data;
        if (groups.indexOf(name) < 0) {
          $http.post('/api/users/userGroup/' + name, {user: user})
          .success(function(data) {
            console.log(name + ' successfully created!');
            $scope.updateGroups();
            // User.get().$promise.then( function (result) {
            //   $scope.numberGroups = result.group.length;
            //   $scope.usersGroups = result.group;
            //   $scope.usersGroups.$apply();
            //   return result;
            // });
        });
        } else {
          $scope.groupName = '';
          alert('Group name already exists!  Choose another name.');
        }
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
      if($scope.userGroups && $scope.usersGroups.indexOf(name) === -1){
        $scope.usersGroups.push(name);
        $scope.numGroups++;
      }
      // $scope.numberLead++;
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
      console.log(group, $scope.currentGroup.groupName);
      return $scope.currentGroup.groupName === group;
    };

    $scope.updateGroups = function (callback) {
      User.get().$promise.then( function (result) {
        $scope.numberGroups = result.group.length;
        $scope.usersGroups = result.group;
        $scope.usersGroups.$apply();
        $scope.groupName = '';
        $scope.numberLead++;
        $scope.addGroupToggle = false;
        return result;
      });
    };

    $scope.getCurrentGroup = function (group) {
      console.log(group);
      $http.get('/api/users/getUsersOfGroup/' + group)
      .success(function (data) {
        $scope.currentgroup = data;
      }); 
    };
    
    $scope.initPiraBoard = function (data) {
      return Modal.app(data);
    }
  });