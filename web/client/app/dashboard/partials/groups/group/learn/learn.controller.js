'use strict';

angular.module('piraBoardApp')
  .controller('LearnCtrl', function ($scope, $http, $filter, Modal, User) {
    $scope.users = User.query();
    // get current group
    // create modal
    //inject modal with current group data

});

