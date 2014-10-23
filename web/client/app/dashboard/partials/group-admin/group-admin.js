'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        parent: 'groups',
        url: '/admin',
        templateUrl: 'app/dashboard/partials/group-admin/group-admin.html',
        controller: 'GroupAdminCtrl'
      });
  });