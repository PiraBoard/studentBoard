'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('groupView', {
        parent:'groups',
        url: '/group',
        templateUrl: 'app/dashboard/partials/groups/group-view/group-view.html',
        controller: 'GroupViewCtrl',
        authenticate: true
      })
  });