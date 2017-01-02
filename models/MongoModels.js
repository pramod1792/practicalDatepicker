var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


var timezones = new Schema({
	value: {type: String},
	abbr: {type: String},
	offset: {type: Number},
	isdst: {type: Boolean},
	text: {type: String},
	utc: [String]
},
{
	collection : 'timezones'
}
);

var dates = new Schema({
	date :  { type: Date, required:true},
	createdAt : { type: Date, default: Date.now }
},
{
	collection : 'dates'
}
);

module.exports.dates = mongoose.model('dates',dates);
module.exports.timezones = mongoose.model('timezones',timezones);





