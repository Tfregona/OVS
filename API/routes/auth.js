const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const Image = require("../models/Image");

const router = express.Router();
const { registerValidation, loginValidation } = require("../validation");
const verify = require("./verifytoken");

// GET ALL
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().populate("avatar");
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST Register
router.post("/register", async (req, res) => {
  // Validate schema
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check if email is not in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send({ message: "Email already exists !" });
  }

  // Check if username is not in the database
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) {
    return res.status(400).send({ message: "Username already exists !" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  // Create a user
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    sexe: req.body.sexe,
    age: req.body.age,
    password: hashpassword,
    avatar: req.body.avatar,
  });
  try {
    await user.save();
    res.status(200).send({ message: "User correctly register !" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: "Email is not found" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Invalid password" });
  }

  // Issue token
  const payload = { user };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "2 days",
  });

  if (user.admin === true) {
    res.cookie("token", token, { httpOnly: true }).send({
      token,
      message: "User logged !",
      role: "Skywalker",
      Id: user._id,
      username: user.username,
    });
  } else {
    res.cookie("token", token, { httpOnly: true }).send({
      token,
      message: "User logged !",
      role: "StormTrooper",
      Id: user._id,
      username: user.username,
    });
  }
});

// GET
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("avatar");
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/my/page", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.user._id).populate("avatar");
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE
router.put("/:userId", verify, async (req, res) => {
  // Check if email exists and if it not belongs to the user edited
  const userSameEmail = await User.findOne({ email: req.body.email });
  if (userSameEmail && userSameEmail._id != req.params.userId) {
    return res.status(400).send({ message: "Email already exists !" });
  }

  // Check if username exists and if it not belongs to the user edited
  const userSameUsername = await User.findOne({ username: req.body.username });
  if (userSameUsername && userSameUsername._id != req.params.userId) {
    return res.status(400).send({ message: "Username already exists !" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  try {
    await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          password: hashpassword,
          admin: req.body.admin,
          avatar: req.body.avatar,
        },
      }
    );
    res.status(200).send({ message: "User correctly updated !" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// Update Image
router.put("/update/image", verify, async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user.user._id },
      {
        $set: {
          avatar: req.body.avatar,
        },
      }
    );
    res.status(200).send({ message: "Image correctly updated !" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// DELETE
router.delete("/:userId", verify, async (req, res) => {
  try {
    const userfound = await User.findById({ _id: req.params.userId });
    await Image.deleteMany({ _id: userfound.avatar });
    await Post.deleteMany({ author: req.params.userId });
    await User.deleteOne({ _id: req.params.userId });
    res.status(200).send({ message: "User correctly deleted !" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
