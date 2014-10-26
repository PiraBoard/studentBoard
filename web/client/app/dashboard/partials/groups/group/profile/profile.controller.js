'use strict';

angular.module('piraBoardApp')
  .controller('ProfileCtrl', function ($scope, $filter, $http, $stateParams, Auth, User) {
    $scope.groupName = $scope.groups[$stateParams.name];
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = User.get();
    $scope.userImage = '';

    $scope.update = function () {
      var id = $scope.user._id;
      console.log(id);
      var profile = {
        name: $scope.name,
        email: $scope.email,
        phonenumber: $scope.number,
        location: $scope.location,
        bio: $scope.biography,
        photo: $scope.userImage,
      };
      console.log('in update');
      User.update({profile: profile});
    }
    $scope.convertImg = function(url, callback, outputFormat) {
      // angular wraps element in an array so we use [0] to get element
      var canvas = angular.element('<canvas></canvas>')[0]; 
      var ctx = canvas.getContext('2d');
      var img = new Image;
      console.log(img);
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
        console.log('there');
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
      console.log('here');
      $scope.convertImg($scope.userImage, function(base64Img) {
        console.log('boner', base64Img);
        $scope.userImage = base64Img;
      });
      // .addImage($scope.userImage);
    }
  });
