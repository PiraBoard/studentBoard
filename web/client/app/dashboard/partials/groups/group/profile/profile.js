'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        parent:'group',
        url: '/profile',
        templateUrl: 'app/dashboard/partials/groups/group/profile/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true
      })
  });