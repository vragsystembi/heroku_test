const express = require("express");
const https = require("https");
const path = require("path");
const router = express.Router();

const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uri =
  "mongodb+srv://aliba:aliba@projects.kfyhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

router.route("/signup").post(async (req, res) => {
  const client = new MongoClient(uri);
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("skillcheck");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User with such email already exists!");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      username,
      email: sanitizedEmail,
      hashed_password: hashedpassword,
    };
    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, username, email: sanitizedEmail });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
