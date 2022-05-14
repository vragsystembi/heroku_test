const express = require("express");
const https = require("https");
const path = require("path");
const router = express.Router();

const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uri =
  "mongodb+srv://aliba:aliba@projects.kfyhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const JWT_SECRET =
  "@ALIBEK@SLAVE@fleksml13EC3k2mk@#mlkl@ALIBEK@SLAVE@fmeSM2f4mk2m4@#Krn2k#@ALIBEK@SLAVE@";

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

router.route("/login").post(async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("skillcheck");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      console.log("no such user");
      return res.json({
        status: "error",
        error: "Invalid username/password or user does not exist1",
      });
    }

    if (await bcrypt.compare(password, user.hashed_password)) {
      // the username, password combination is successful

      console.log(1);

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET
      );

      return res.json({ status: "ok", data: token });
    }
  } catch (err) {
    res.json({
      status: "error",
      error: "Invalid username/password or user does not exist2",
    });
    console.log(err);
  }
});

module.exports = router;
