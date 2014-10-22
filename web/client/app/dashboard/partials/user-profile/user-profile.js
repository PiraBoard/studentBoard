'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboardProfile', {
        url: '/dashboard/profile',
        templateUrl: 'app/dashboard/partials/user-profile/user-profile.html',
        controller: 'UserProfileCtrl',
        authenticate: true
      })
  });