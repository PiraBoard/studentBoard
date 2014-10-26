'use strict';

angular.module('piraBoardApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.groups = [
      {
        groupName:'Omnicron', 
        members: []//[{name:'Tony Chong', email: 'brokenhearted@nolove.com',role: 'user'}, {name:'Tony Tiger', email:'wheat@bloodsugar.com',role: 'user'}, {name: 'John Cheech', email: 'smokesthings@420.com', role: 'admin'}]
      },       
      {
        groupName:'CSI110', 
        members: []//[{name:'Tony Chong', email: 'brokenhearted@nolove.com',role: 'user'}, {name:'Tony Tiger', email:'wheat@bloodsugar.com',role: 'user'}, {name: 'John Cheech', email: 'smokesthings@420.com', role: 'admin'}]
      }, 
      {
        groupName:'Micronub',
        members: []//[{name:'Tony Chong', email: 'brokenhearted@nolove.com',role: 'user'}, {name:'Tony Tiger', email:'wheat@bloodsugar.com',role: 'user'}, {name: 'John Cheech', email: 'smokesthings@420.com', role: 'admin'}]
      }
    ];

    //Need to make this dynamic, for when groups are added
    $scope.groupIndexFromName = {
      'Omnicron' : 0,
      'CSI110' : 1,
      'Micronub' : 2
    }

    $scope.numLead = 0;
    $scope.numGroups = $scope.groups.length;
    $scope.addGroupToggle = false; 
    $scope.profileToggle = false;
    $scope.infoBoxToggle = false;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentGroup = {}; // currently selected group

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

    $scope.getGroup = function(index) {
      $scope.infoBoxToggle = true;
      $scope.profileToggle = false;
      return $scope.currentGroup = $scope.groups[index];
    };

    $scope.isCurrentGroup = function (group) {
      return $scope.currentGroup.groupName === group;
    };

    $scope.update

    $scope.createGroup = function (name) {
      alert(name);
      console.log('creating a group');
      // make group in database and add group to list on success
      $scope.groups.push( {groupName: name, members: []} );
      $scope.numGroups++ && $scope.numLead++;
    };
  });
