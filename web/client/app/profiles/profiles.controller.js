'use strict';

angular.module('piraBoardApp')
  .controller('ProfilesCtrl', function ($scope, $http, Auth, Image) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
    	//for testing
    	// users[0].photo = 
    	//some base64string for testing

      $scope.users = users;
    });
    
  });

  angular.module('piraBoardApp').filter('groupFilter', function() {
      return function(users, filterText, nameFilter){
      	var filtered = [];
      	var userFiltered = [];
      	// console.log(filterText);
      	var letterMatch = new RegExp(filterText, "gi");
      	var nameMatch = new RegExp(nameFilter, "gi");

      	for(var i=0; i<users.length; i++){
      		var user = users[i];
      		var groups = user.group;
      
	  			for(var j=0; j<groups.length; j++){
	  				var group = groups[j];
	  				// console.log(group);
	    			if(letterMatch.test(group)){
	    				if(filtered.indexOf(user) === -1){
		    				filtered.push(user);
		    			}
	    			}
	    		}
      	}
      	return filtered;
      };
  });

  angular.module('piraBoardApp').filter('nameFilter', function() {
      return function(users, nameFilter){
      	var userFiltered = [];
      	var nameMatch = new RegExp(nameFilter, "gi");

      	for(var i=0; i<users.length; i++){
      		var user = users[i];

      		if(nameMatch.test(user.name)){
    				if(userFiltered.indexOf(user) === -1){
	    				userFiltered.push(user);
	    			}
      		}
      	}
      	return userFiltered;
      };
  });