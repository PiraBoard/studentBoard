'use strict';

angular.module('piraBoardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('batch', {
        url: '/batch',
        templateUrl: 'app/batchUpload/batch.html',
        controller: 'BatchCtrl'
      });
  });