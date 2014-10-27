/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'jim',
    email: 'test@test.com',
    password: 'test',
    group: 'Omnicron',
    active: true
  }); 
  
  User.create({
    provider: 'local',
    name: 'Alex Jeng',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'Omnicron'
  })

  User.create({
    provider: 'local',
    name: 'Rishi Goomar',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  })  

  User.create({
    provider: 'local',
    name: 'Ralph Samuel',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Adam Back',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Kevin Meurer',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Moxi Zhou',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Jamon Douglas',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Sean Rose',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Jose Joaquin Merino',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Justin Pinili',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Peter Shatara',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Supriya',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  })  

  User.create({
    provider: 'local',
    name: 'Will Burgo',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Rich',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Kia',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Jeff',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Oleg',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Urvashi',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Liam',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Derek',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 
  
  User.create({
    provider: 'local',
    name: 'Tom',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Carl',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  })  

  User.create({
    provider: 'local',
    name: 'Will',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Jason',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Andrew',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Mike Horan',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Michael Pinter',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Jameson',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Greg',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  })  

  User.create({
    provider: 'local',
    name: 'Ryo',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 
  
  User.create({
    provider: 'local',
    name: 'Caly',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Josh',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }) 

  User.create({
    provider: 'local',
    name: 'Allen',
    email: 'tdwqest@tedqst.com',
    password: 'test',
    group: 'HR18'
  }); 
});