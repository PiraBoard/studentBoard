'use strict';

angular.module('piraBoardApp')
  .controller('ProfileCtrl', function ($scope, $filter, $http, $stateParams, Auth, User, Image) {
    $scope.groupName = $scope.groups[$stateParams.name];
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = {};
    $scope.encode = Image.log;
    User.get().$promise.then(function (user) {
      $scope.user.name = user.name;
      $scope.user.email = user.email;
      $scope.user.phonenumber = user.phonenumber;
      $scope.user.location = user.location;
      $scope.user.bio = user.bio;
      $scope.user.photo = user.photo;
    });

    $scope.encode($scope.user.photo);

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
    $scope.convertImg = function(url, callback, outputFormat) {
      // angular wraps element in an array so we use [0] to get element
      var canvas = angular.element('<canvas></canvas>')[0]; 
      var ctx = canvas.getContext('2d');
      var img = new Image;
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
        canvas.height = 200;
        canvas.width = 200;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null; 
      };
      img.src = url;
    };
    $scope.addImage = function() {
      $scope.convertImg($scope.userImage, function(base64Img) {
        $scope.userImage = base64Img;
      });
      // .addImage($scope.userImage);
    }
  })
