const express = require("express");
const path = require("path");
const router = express.Router();
router.route("/").get((req, res) => res.render("subscription"));
module.exports = router;
