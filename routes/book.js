var express = require("express");
var router = express.Router();
var checkSessionAuth = require("../middlewares/checkSessionAuth");
var Book = require("../models/book");

/* GET home page. */
router.get("/", async function (req, res, next) {
	let books = await Book.find();
	console.log(req.session.user);
	res.render("books/list", { title: "Books In Store", books });
});

router.get("/add", checkSessionAuth, async function (req, res, next) {
	res.render("books/add");
});

router.post("/add", async function (req, res, next) {
	let book = new Book(req.body);
	await book.save();
	res.redirect("/books");
});
router.get("/delete/:id", async function (req, res, next) {
	let book = await Book.findByIdAndDelete(req.params.id);
	res.redirect("/books");
});

//for edit
router.get("/edit/:id", async function (req, res, next) {
	let book = await Book.findById(req.params.id);
	res.render("books/edit", { book });
});
router.post("/edit/:id", async function (req, res, next) {
	let book = await Book.findById(req.params.id);

	book.book = req.body.book;
	book.price = req.body.price;
	book.author_name = req.body.author_name;
	await book.save();
	res.redirect("/books");
});

//add to cart
router.get("/cart/:id", async function (req, res, next) {
	let book = await Book.findById(req.params.id);
	let cart = [];
	if (req.cookies.cart) cart = req.cookies.cart;
	cart.push(book);
	res.cookie("cart", cart);
	res.redirect("/books");
});
//remove from cart
router.get("/cart/remove/:id", async function (req, res, next) {
	let cart = [];
	if (req.cookies.cart) cart = req.cookies.cart;
	cart.splice(
		cart.findIndex((c) => c._id == req.params.id),
		1
	);
	res.cookie("cart", cart);
	res.redirect("/cart");
});
module.exports = router;
