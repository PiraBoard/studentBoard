'use strict';

angular.module('piraBoardApp')
.controller('ProfileCtrl', function ($scope, $filter, $http, $stateParams, Auth, User) {
  $scope.groupName = $scope.groups[$stateParams.name];
  $scope.isAdmin = Auth.isAdmin;
  $scope.user = {};
  User.get().$promise.then(function (user) {
    $scope.user.name = user.name;
    $scope.user.email = user.email;
    $scope.user.phonenumber = user.phonenumber;
    $scope.user.location = user.location;
    $scope.user.bio = user.bio;
    $scope.user.photo = user.photo;
  });

  $scope.update = function () {
    var payload = {
      name: $scope.user.name,
      email: $scope.user.email,
      phonenumber: $scope.user.phonenumber,
      location: $scope.user.location,
      bio: $scope.user.bio,
      photo: $scope.user.photo,
    };
    User.update({profile: payload});
  };
})
