'use strict';

angular.module('piraBoardApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.numGroups = 0;
    $scope.numLead = 0;
    $scope.groups = [
      {
        groupName:'Omnicron', 
        members: [{name:'Jim', role: 'user'}, {name: 'John', role: 'admin'}]
      },       
      {
        groupName:'CSI110', 
        members: [{name:'Tony', role: 'user'}, {name:'Tony', role: 'user'}, {name: 'John', role: 'admin'}]
      }, 
      {
        groupName:'Micronub',
        members: [{name:'Alex', role: 'user'}, {name:'Tony', role: 'user'}, {name: 'Jose', role: 'admin'}]

      }
    ];
    $scope.getCurrentUser = Auth.getCurrentUser;
    // Join/Create button switch 
    $scope.groupInput = true;
    $scope.currentGroup = {};
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.getGroup = function(index) {
      return $scope.currentGroup = $scope.groups[index];
    };

  });
