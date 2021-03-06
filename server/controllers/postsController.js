const { Post, User } = require("../models");
const uploadImage = require("../utils/uploadImg");
const populateBy = require("./utils/populateBy");

module.exports = {
  findUserPosts: async (req, res) => {
    try {
      const postModel = await Post.findById(req.params.id).populate(
        populateBy("post")
      );
      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    const { title, content, imageUrl, author, hashtags } = req.body;
    try {
      let img = "";
      if (imageUrl) {
        img = await uploadImage(imageUrl);
      }
      const postModel = await Post.create({
        title,
        content,
        imageUrl: img,
        author,
        hashtags
      });
      res.status(201).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    const { imageUrl } = req.body;
    const upDatePost = req.body;
    try {
      if (imageUrl) {
        upDatePost.imageUrl = await uploadImage(imageUrl);
      }

      const postModel = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: upDatePost
        },
        { new: true, runValidators: true }
      );

      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updateObjectID: async (req, res) => {
    try {
      const postModel = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: req.body
        },

        { new: true, runValidators: true }
      );

      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      await Post.findByIdAndDelete({ _id: req.params.id });

      await User.findByIdAndUpdate(
        req.params.userId,
        {
          $pull: { posts: req.params.id }
        },

        { new: true, runValidators: true }
      );
      //const deleteModel = await postModel.remove();
      res.status(200).json("deleted post");
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getAllPost: async (req, res) => {
    try {
      const allPost = await Post.find({})
        .sort({ date: -1 })
        .populate(populateBy("post"))
        .exec();
      res.status(200).json(allPost);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  removeliked: async (req, res) => {
    try {
      const postModel = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $pull: req.body
        },

        { new: true, runValidators: true }
      );

      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
