const { User } = require("../models");
//const { Organization } = require("../models");
const { createPassword } = require("../config/bcrypt.js");

const uploadImage = require("../utils/uploadImg");
const populateBy = require("./utils/populateBy");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select(
          "firstName lastname username email role profileImg bannerImg following followers posts bio causes address website phoneNumber orgName"
        )
        .populate(populateBy("user"))
        .exec();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  findIfUserLikesCause: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select("causes")
        .exec();

      const found = user.causes.find(
        element => element.toString() === req.params.causeId.toString()
      );

      if (found) {
        return res.status(200).json(true);
      }

      res.status(200).json(false);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { password, profileImg } = req.body;
      const updateUser = req.body;

      if (password) {
        updateUser.password = await createPassword(password);
      }

      if (profileImg) {
        updateUser.profileImg = await uploadImage(profileImg);
      }
      const id = { _id: req.params.id };
      const set = { $set: updateUser };
      const validator = { new: true, runValidators: true };

      const foundUser = await User.findOneAndUpdate(id, set, validator);

      return res.status(200).json(foundUser.firstName);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  updateUserObjectID: async (req, res) => {
    try {
      const postModel = await User.findByIdAndUpdate(
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
  removeUserObjectID: async (req, res) => {
    try {
      const postModel = await User.findByIdAndUpdate(
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
  },
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updatePassword: async () => {
    const hash = await createPassword(req.body.password);
    try {
      await User.findOneAndUpdate({ _id: req.params.id }, { password: hash });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};
