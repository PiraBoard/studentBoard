'use strict';

angular.module('piraBoardApp')

.controller('BatchCtrl', [ '$scope', '$http', function($scope, $http) {
  console.log('initialized', $scope);
  $scope.onFileSelect = function($files) {
    console.log('selected files', $files);
    var currentGroup = $scope.groupName;

    console.log(currentGroup);
    if(!currentGroup){
      alert('Please select a group to add people to.');
      return;
    }
    for(var i=0; i<$files.length; i++){
      var file = $files[i];

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          console.log('parsed: ', results);

          //stringify the results for transport
          for(var k=0; k<results.data.length; k++){
            //append group to each user uploaded
            results.data[k].group = currentGroup;
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
              // $scope.getUsersOfGroup();
              $scope.addGroupMembers($scope.groupName, data);
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
