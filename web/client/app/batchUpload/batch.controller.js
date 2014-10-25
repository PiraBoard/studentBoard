'use strict';

angular.module('piraBoardApp')

.controller('BatchCtrl', [ '$scope', '$http', function($scope, $http) {
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

          //stringify the results for transport
          for(var k=0; k<results.data.length; k++){
            results.data[k] = JSON.stringify(results.data[k]);
          }

          //So, node is not happy with how large our batch uploads are
          //So, we are dividing them into smaller chunks
          console.log('parsed results: ', results.data.length);
          for(var j=0; j<results.data.length; j+=100){
            var users = results.data.slice(j, j+100);
            console.log('num users this req: ', users.length);
            
            //POST TO api/users/createManyUsers
            //with array of user data objects as parameter
            $http.post('/api/users/createManyUsers', {
              users: users
            }).
            success(function(data) {
              console.log('server is adding new users');
            }).
            error(function(err) {
              console.log('error adding user: ', err);
            }.bind(this));
          }

        }
      });
    }
  };
}]);
