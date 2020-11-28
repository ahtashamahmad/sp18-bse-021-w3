var mongoose = require("mongoose");
const Joi = require("joi");

var ReadSchema = mongoose.Schema({
	Serial_No: String,
	book: String,
});
const Read = mongoose.model("Read", ReadSchema);

module.exports = Read;
