const express = require("express");
const https = require('https')
const path = require("path");
const router = express.Router();



router
    .route("/email/")
    .post((req, res) => {
        const apiKey = "2b1e810090b21cab8a8753ec6bd1f09157eca438a4b994e4aa3c484409f091a741bdb9455c261b124da332f351cd5966";
        https.get("https://verifier.meetchopra.com/verify/" + req.body.email + "?token=" + apiKey, (response) => {
            console.log(response.statusCode);
            response.on("data", (data) => {
                const wData = JSON.parse(data);
                const result = wData.status == true ? "yes" : wData.error.message;
                res.send(result)
            });
        })
    });
module.exports = router;