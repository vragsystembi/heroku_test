const express = require("express");
const path = require("path");
const router = express.Router();
const axios = require('axios');

router
    .route("/")
    .get(async(req, res) => {
        const urlPath = req.protocol + '://' + req.get('host') + "/facts";
        await axios.get(urlPath).then(response => {
            res.render("home", {
                fun_fact: response.data.text,
            })
        }).catch(error => console.error(error));
    })
    .post((req, res) => res.send("POST HOME"));
module.exports = router;