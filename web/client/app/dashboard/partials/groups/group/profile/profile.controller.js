'use strict';

angular.module('piraBoardApp')
  .controller('ProfileCtrl', function ($scope, $filter, $http, $stateParams, Auth, User) {
    $scope.groupName = $scope.groups[$stateParams.name];
    $scope.isAdmin = Auth.isAdmin;
    $scope.userImage = '';

    $scope.user = (function () {
      User.get().$promise.then(function (user) {
        $scope.name = user.name;
        $scope.email = user.email;
        $scope.phonenumber = user.phonenumber;
        $scope.location = user.location;
        $scope.bio = user.bio;
      });
    }());

    $scope.update = function () {
      var id = $scope.user._id;
      var profile = {
        name: $scope.name,
        email: $scope.email,
        phonenumber: $scope.phonenumber,
        location: $scope.location,
        bio: $scope.bio,
        photo: $scope.photo,
      };
      User.update({profile: profile});
    };
    $scope.convertImg = function(url, callback, outputFormat) {
      // angular wraps element in an array so we use [0] to get element
      var canvas = angular.element('<canvas></canvas>')[0]; 
      var ctx = canvas.getContext('2d');
      var img = new Image;
      console.log(img);
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
  });
