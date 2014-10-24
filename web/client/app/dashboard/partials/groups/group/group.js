'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        parent:'groups',
        url: '/:name',
        templateUrl: 'app/dashboard/partials/groups/group/group.html',
        controller: 'GroupCtrl',
        authenticate: true
      })
  });