const express = require("express");
const path = require("path");
const router = express.Router();
const axios = require('axios');

router
    .route("/")
    .get((req, res) => {
        // axios.get("http://localhost:3000/facts").then(response => {
        //     res.render("home", {
        //         fun_fact: response.data[0],
        //     })
        // }).catch(error => console.error(error));
        res.render("home");
    })
    .post((req, res) => res.send("POST HOME"));
module.exports = router;