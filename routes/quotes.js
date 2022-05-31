const express = require("express");
const https = require('https')
const path = require("path");
const router = express.Router();



router
    .route("/")
    .get((req, res) => {
        https.get("https://quote-garden.herokuapp.com/api/v3/quotes/random?genre=learning", (response) => {
            // console.log(response.statusCode);
            response.on("data", (data) => {
                const wData = JSON.parse(data);
                res.send(wData)
            });
        })
    });
module.exports = router;