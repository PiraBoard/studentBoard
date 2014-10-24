'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('groups', {
        parent:'dashboard',
        url: '/groups',
        templateUrl: 'app/dashboard/partials/groups/groups.html',
        controller: 'GroupsCtrl',
        authenticate: true
      })
  });