const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', 'client')

app.use(express.static("client"));
app.use(bodyParser.json())

app.use("/", require(path.join(__dirname, "routes", "home")));
app.use("/about", require(path.join(__dirname, "routes", "about")));
app.use("/features", require(path.join(__dirname, "routes", "features")));
app.use("/quotes", require(path.join(__dirname, "routes", "quotes")));
app.use("/facts", require(path.join(__dirname, "routes", "facts")));
app.use("/verification", require(path.join(__dirname, "routes", "verification")));
app.use("/api", require(path.join(__dirname, "routes", "api")));

var port_num = (process.env.PORT || 3000);

app.listen(port_num, () =>
    console.log(`App listening at http://localhost:${port_num}`)
);