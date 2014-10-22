'use strict';

angular.module('piraBoardApp')
  .controller('UserProfileCtrl', function ($scope, Auth, $location, $window, $timeout) {
    $scope.errors = {};
    $scope.savedSuccessfully = false;
    $scope.imagePath = 'images/forever_alone.jpg';

    $("#imgInput").change(function(){
        readURL(this);
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
          $('#imageView').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
      }
    }



    //Should populate text fields based on user into
    //retrieved from server

    $scope.save = function(form) {
      $scope.submitted = true;

      //Should save user changes,
      //not create a new user *** FIX *** once database is enabled
      if(form.$valid) {
        $scope.savedSuccessfully = true;

        //Tells the user that the data was saved successfully
        //Removes the message after a few seconds

        $timeout(function(){
          $scope.savedSuccessfully=false;
        }, 3000);
      }
    };
  });


