var express = require("express");
var router = express.Router();
var checkSessionAuth = require("../middlewares/checkSessionAuth");
var Read = require("../models/read");

/* GET users listing. */
router.get("/", async function (req, res, next) {
	let reads = await Read.find();
	//console.log(req.session.user);
	res.render("read/list", { title: "Some Online Books to read", reads });
});
router.get("/", function (req, res, next) {
	res.render("read/list");
});
//add
router.get("/add", checkSessionAuth, async function (req, res, next) {
	res.render("read/add");
});

router.post("/add", async function (req, res, next) {
	let read = new Read(req.body);
	await read.save();
	res.redirect("/read");
});
//delete
router.get("/delete/:id", checkSessionAuth, async function (req, res, next) {
	let read = await Read.findByIdAndDelete(req.params.id);
	res.redirect("/read");
});
module.exports = router;
