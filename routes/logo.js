const express = require("express");
const path = require("path");
const router = express.Router();
router
    .route("/")
    .get((req, res) =>
        res.sendFile(path.join(__dirname, "..", "res", "logo_white.png"))
    );
module.exports = router;