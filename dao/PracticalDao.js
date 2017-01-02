var models = require('../models');
var timezones = models.timezones;
var dates = models.dates;

var errors = {
	Runtime : { json: { code : "ERR40000", message: "Runtime Exception Occurred.", description: "Runtime Exception Occurred."} , status: 500 }
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

var getAllTimezones = function(req, res) {

	timezones.find({},{"_id":0,"__v":0},function(error, timezones) {
		if(error)
		{
			console.log("----------------------------Error Trace START-------------------------------");
			console.log(error.stack);
			console.log("-----------------------------Error Trace END-------------------------------");	
			errorHandler(error.message, res);
			return;
		}
		res.status(200).send(timezones);
	});
}

var AddSelectedDateTime = function(req,res){
	
	dates.create(req.body,function(error){
		if(error){
			console.log(error);
			res.status(418).send({"message":"Unable to add new date."});
		}else{
			
			res.status(201).send({"message":"success"});
		}
	})
	
}

var getRecentDate = function(req, res) {

	dates.find({},{"_id":0,"__v":0},function(error, recentDate) {
		if(error)
		{
			console.log("----------------------------Error Trace START-------------------------------");
			console.log(error.stack);
			console.log("-----------------------------Error Trace END-------------------------------");	
			errorHandler(error.message, res);
			return;
		}
		res.status(200).send(recentDate);
	}).sort({createdAt: -1}).limit(1);
}

exports.AddSelectedDateTime = AddSelectedDateTime;
exports.getAllTimezones = getAllTimezones;
exports.getRecentDate = getRecentDate;