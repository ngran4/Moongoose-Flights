// Point of this file 
// is to create a connection the mongodb server running on port 27017
const mongoose = require('mongoose');

// movies is the name of the db, it will either connect to a movies database in mongodb
// or it will create a movies database in mongodb
mongoose.connect('mongodb://localhost/flights');

// this will fire when mongoose (our express app)
// has established a connecction with mongodb on port 27017
mongoose.connection.on('connected', function(){
	console.log(`Connected to Mongodb at 27017`)
});
