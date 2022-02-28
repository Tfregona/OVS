const express = require("express");

const router = express.Router();
const Sport = require("../models/Sport");
const { sportValidation } = require("../validation");
const verify = require("./verifytoken");

// ROUTE: '/sports'

// GET ALL
router.get("/", async (req, res) => {
  try {
    const sports = await Sport.find().sort({title: 'asc'});
    res.json(sports);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:sportId", async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.sportId);
    res.json(sport);
  } catch (err) {
    res.status(400).send(err);
  }
});

// POST
router.post("/", verify, async (req, res) => {
  const { error } = sportValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the sport is not in the database
  const sportexist = await Sport.findOne({ title: req.body.title });
  if (sportexist) return res.send({ message: "Sport already exists !" });

  const sport = new Sport({
    title: req.body.title,
    description: req.body.description,
    url_image: req.body.url_image,
    url_wiki: req.body.url_wiki,
  });
  try {
    await sport.save();
    res.status(200).send({ message: "Sport correctly register !" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE
router.put("/:sportId", verify, async (req, res) => {
  try {
    await Sport.updateOne(
      { _id: req.params.sportId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          url_image: req.body.url_image,
          url_wiki: req.body.url_wiki,
        },
      }
    );
    res.status(200).send({ message: "Sport correctly updated !" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE
router.delete("/:sportId", verify, async (req, res) => {
  try {
    await Sport.deleteOne({ _id: req.params.sportId });
    res.status(200).send({ message: "Sport correctly deleted !" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
