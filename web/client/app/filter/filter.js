'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('filter', {
        url: '/filter',
        templateUrl: 'app/filter/filter.html',
        controller: 'FilterCtrl',
        authenticate: true
      });
  });

