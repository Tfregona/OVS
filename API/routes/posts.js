const express = require("express");

const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Sport = require("../models/Sport");
const verify = require("./verifytoken");
const { postValidation } = require("../validation");

// ROUTE: '/posts'

// GET ALL
router.get("/", async (req, res) => {
  let limitValue = 150;
  const filterDate = -1;
  try {
    const query = {};
    if (req.query.localisation) {
      query.localisation = {
        $regex: `${req.query.localisation}`,
        $options: "$i",
      };
    }
    if (req.query.sport) {
      query.description = {
        $regex: `${req.query.sport}`,
        $options: "$i",
      };
    }
    if (req.query.limit) {
      limitValue = req.query.limit;
    }
    const posts = await Post.find(query)
      .sort({ date: filterDate })
      .limit(limitValue)
      .populate({
        path: "author",
        populate: {
          path: "avatar",
        },
      })
      .populate("sport")
      .populate("attendees");
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate({
        path: "author",
        populate: {
          path: "avatar",
        },
      })
      .populate("sport")
      .populate("attendees");
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET POSTS FOR THE AUTHOR
router.get("/author/account", verify, async (req, res) => {
  const limitValue = 150;
  const filterDate = -1;
  try {
    const posts = await Post.find({ author: req.user.user._id })
      .sort({ date: filterDate })
      .limit(limitValue)
      .populate("author")
      .populate("sport")
      .populate("attendees");
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET POSTS FOR THE ATTENDEES
router.get("/attendee/account", verify, async (req, res) => {
  const limitValue = 150;
  const filterDate = -1;
  try {
    const posts = await Post.find({ attendees: req.user.user._id })
      .sort({ date: filterDate })
      .limit(limitValue)
      .populate("author")
      .populate("sport")
      .populate("attendees");
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST
router.post("/", verify, async (req, res) => {
  User.findById(req.user.user._id)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "User not found",
        });
      }
    })
    .then(
      Sport.findById(req.body.sport).then((sport) => {
        if (!sport) {
          return res.status(404).send({ message: "Sport not found" });
        }
        // Validate schema
        const { error } = postValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const post = new Post({
          title: req.body.title,
          description: req.body.description,
          places: req.body.places,
          localisation: req.body.localisation,
          level: req.body.level,
          sport: req.body.sport,
          date: req.body.date,
          author: req.user.user._id,
        });
        res.status(200).send({ message: "Post correctly created !" });
        return post.save();
      })
    )
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    });
});

// UPDATE
router.put("/:postId", verify, async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          places: req.body.places,
          localisation: req.body.localisation,
          sport: req.body.sport,
          level: req.body.level,
          attendees: req.body.attendees,
        },
      }
    );
    res.status(200).send({ message: "Post correctly updated !" });
  } catch (err) {
    res.json({ message: err });
  }
});

// INSCRIPTION
router.put("/inscription/:postId", verify, async (req, res) => {
  try {
    const alreadyInscribed = await Post.findOne({
      _id: req.params.postId,
      attendees: req.user.user._id,
    })
      .populate("author")
      .populate("sport")
      .populate("attendees");
    if (alreadyInscribed) {
      return res
        .status(400)
        .send({ message: "You are already inscribed to this event" });
    }

    const post = await Post.findById(req.params.postId)
      .populate("author")
      .populate("sport")
      .populate("attendees");
    if (post.places <= 0) {
      return res.status(400).send({ message: "No more places for this event" });
    }

    await Post.updateOne(
      { _id: req.params.postId },
      {
        $push: {
          attendees: req.user.user._id,
        },
        $set: {
          places: post.places - 1,
        },
      }
    );
    res.status(200).send({ message: "Correctly inscribed !" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// DESINSCRIPTION
router.put("/desinscription/:postId", verify, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      attendees: req.user.user._id,
    })
      .populate("author")
      .populate("sport")
      .populate("attendees");
    if (!post) {
      return res
        .status(400)
        .send({ message: "You are not inscribed to this event" });
    }

    await Post.updateOne(
      { _id: req.params.postId },
      {
        $pull: {
          attendees: req.user.user._id,
        },
        $set: {
          places: post.places + 1,
        },
      }
    );
    res.status(200).send({ message: "Correctly desinscribed !" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// DELETE
router.delete("/:postId", verify, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.postId });
    res.status(200).send({ message: "Post correctly deleted !" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
