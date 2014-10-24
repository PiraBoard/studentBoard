'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
        parent:'dashboard',
        url: '/settings',
        templateUrl: 'app/dashboard/partials/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
  });