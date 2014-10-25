'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profiles', {
        url: '/profiles',
        templateUrl: 'app/profiles/profiles.html',
        controller: 'ProfilesCtrl'
      });
  });

