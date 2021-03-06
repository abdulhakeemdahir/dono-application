const { Cause } = require("../models");
const { User } = require("../models");
const uploadImage = require("../utils/cloudinary");
const populateBy = require("./utils/populateBy");

module.exports = {
  getAllCause: async (req, res) => {
    try {
      const Post = await Cause.find({})
        .find({})
        .sort({ date: -1 })
        .populate(populateBy("causes"))
        .exec();
      res.status(200).json(Post);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getUsersCauses: async (req, res) => {
    try {
      const causeModel = await Cause.find(req.body.username).sort({ date: -1 });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getTrending: async (req, res) => {
    try {
      const causeModel = await Cause.find(req.body.data)
        .populate({
          path: "likes",
          populate: {
            path: "user",
            select: "username orgName",
            model: "User"
          }
        })
        .sort({ date: -1 });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async ({ body }, res) => {
    const { title, content, imageUrl, author } = body;
    try {
      let img = "";
      if (imageUrl) {
        img = uploadImage(imageUrl);
      }
      const causeModel = await Cause.create({
        title,
        content,
        imageUrl: img,
        author
      });
      res.status(201).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    const { imageUrl } = req.body;
    const upDateCause = req.body;
    try {
      if (imageUrl) {
        upDateCause.imageUrl = uploadImage(imageUrl);
      }
      const causeModel = await Cause.findByIdAndUpdate(
        req.params.id,
        {
          $set: upDateCause
        },
        { new: true, runValidators: true }
      );
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const causeModel = await Cause.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },

  addLike: async (req, res) => {
    try {
      const user = await User.find(req.params.username);
      const causeModel = await Cause.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: user._id }
        },

        { new: true, runValidators: true }
      );
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
