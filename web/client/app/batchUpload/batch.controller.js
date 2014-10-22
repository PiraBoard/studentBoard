'use strict';

angular.module('piraBoardApp')

.controller('BatchCtrl', [ '$scope', function($scope) {
  console.log('initialized', $scope);
  $scope.onFileSelect = function($files) {
    console.log('selected files', $files);

    for(var i=0; i<$files.length; i++){
      var file = $files[i];

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          console.log('parsed: ', results);

          for(var j=0; j<results.data.length; j++){
            var person = results.data[j];
            console.log(person);

            //at this point, we should either
            //1. send each person to the server to be added individually OR
            //2. send the entire list in one request to be added in bulk
          }
        }
      });
    }
  };
}]);
