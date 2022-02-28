const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

router.post("/store-image", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "Please enter an icon url" });
    }
    let newImage = new Image({
      image,
    });
    newImage = await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;