'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('learn', {
        parent:'group',
        url: '/learn',
        templateUrl: 'app/dashboard/partials/groups/group/learn/learn.html',
        controller: 'LearnCtrl',
        authenticate: true
      })
  });