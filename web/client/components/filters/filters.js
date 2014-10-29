angular.module('piraBoardApp')
.filter('groupFilter', function() {
  return function(users, filterText){
   var filtered = [];
        // console.log(filterText);
        var letterMatch = new RegExp(filterText, "gi");

        for(var i=0; i<users.length; i++){
          var user = users[i];
          var groups = user.group;

          for(var j=0; j<groups.length; j++){
           var group = groups[j] + '';
           console.log(group);
           console.log(filterText);
           console.log(group.indexOf(filterText));
          if(!filterText || group.toLowerCase().indexOf(filterText.toLowerCase()) > -1){//letterMatch.test(group)){
            console.log('YAY');
            if(filtered.indexOf(user) === -1){
              filtered.push(user);
            }
          }
        }
      }
      return filtered;
    };
  });

angular.module('piraBoardApp')
.filter('nameFilter', function() {
  return function(users, nameFilter){
   var userFiltered = [];
   var nameMatch = new RegExp(nameFilter, "gi");

   for(var i=0; i<users.length; i++){
    var user = users[i];

    if(nameMatch.test(user.name)){
      if(!nameFilter || user.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1){
       userFiltered.push(user);
     }
   }
 }
 return userFiltered;
};
});