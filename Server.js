var app = require('./singletons/http-singleton').app;
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var fs = require('fs');

var errors = {
	Runtime : { json: { code : "ERR00000", message: "Runtime Exception Occurred.", description: "Runtime Exception Occurred."} , status: 500 }
};

var errorHandler = function(errName, res)
{
	if(errors[errName])
		res.status(errors[errName].status).send(errors[errName].json);
	else
	{
		var ret = errors["Runtime"].json;
		ret.description = errName;
		res.status(500).send(ret);
	}
};


app.use(cors());

app.use(bodyParser());
require("./routes/practicalRoutes.js");


app.get('/_ping',function(req,res){
	res.status(200).send({"result":"ping success"})
	
})

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
  res.redirect('/index.html');
});





app.use(
	function(req, res, next)
	{
		if(req.method === 'OPTIONS')
			next();
		else
		{
        	console.log("Path not found: " + req.originalUrl);
			res.status(404).send({
				"error" : "Page Not Found",
				"message" : "Incorrect Collection Passed",
				"description" : "Cannot Detect the url"
			});
		}
	}
);


var server = app.listen(3000, function(){
	console.log('Server Started.');
	console.log('Server is listening at: '+3000);		
});
server.timeout = 1800000;

// When Node process ends
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

