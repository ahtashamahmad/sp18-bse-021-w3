var mongoose = require("mongoose");
const Joi = require("joi");

var BookSchema = mongoose.Schema({
	book: String,
	author_name: String,
	price: String,
});
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
