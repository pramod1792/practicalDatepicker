var mongoose = require('mongoose');
var conf = require('../package');

var mongooseModels = require('./MongoModels');

for(var key in mongooseModels)
{
	module.exports[key] = mongooseModels[key];
}

// Build the connection string
var dbURI = conf.config.mongoose.dbURI;

var options = {
  db: { native_parser: true },
  server: { poolSize: conf.config.mongoose.poolSize }
}

// Create the database connection
mongoose.connect(dbURI, options);

if(conf.config.mongoose.logging === "true"){
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
