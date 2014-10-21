'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('batch', {
        url: '/',
        templateUrl: 'app/batchUpload/batch.html',
        controller: 'BatchCtrl'
      });
  });