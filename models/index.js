var mongoose = require('mongoose');

var mongooseModels = require('./MongoModels');

for(var key in mongooseModels)
{
	module.exports[key] = mongooseModels[key];
}

// Build the connection string 
var dbURI = process.env.npm_package_config_mongoose_dbURI; 

var options = {
  db: { native_parser: true },
  server: { poolSize: process.env.npm_package_config_mongoose_poolSize }
}

// Create the database connection 
mongoose.connect(dbURI, options); 

if(process.env.npm_package_config_mongoose_logging === "true"){
	mongoose.set('debug', true);
}else{
	mongoose.set('debug', false);
}

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

