const { Post } = require("../models");

//*CLOUD BEG

const cloudinary = require("../../utils/cloudinary");

//*CLOUD END

module.exports = {
  findFollowing: async (req, res) => {
    try {
      const postModel = await Post.find({}).sort({ date: -1 });
      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findTrending: async (req, res) => {
    try {
      const postModel = await Post.find({}).sort({ date: -1 });

      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  findUserPosts: async (req, res) => {
    try {
      const postModel = await Post.findById(req.query).sort({ date: -1 });
      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async ({ body }, res) => {
    const { title, content, imageUrl, author, hashtags } = body;
    try {
      //*CLOUD BEG
      //Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //Create post body with form data and cloudinary secure_url and public_id
      const value = {
        body,
        image: result.secure_url,
        // eslint-disable-next-line camelcase
        cloudinary_id: result.public_id
      };
      const model = await db.Post.create(value);
      res.json(model);
      //*CLOUD END
      const postModel = await Post.create({
        title,
        content,
        imageUrl,
        author,
        hashtags
      });
      res.status(201).json(postModel);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
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
      const postModel = await Post.findByIdAndDelete({ _id: req.params.id });
      //const deleteModel = await postModel.remove();
      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getAllPost: async (req, res) => {
    try {
      const allPost = await Post.find({})
        .sort({ date: -1 })
        .populate([
          {
            path: "author",
            select: "firstName",
            model: "User"
          },
          {
            path: "hashtags",
            model: "Hashtag"
          },
          {
            path: "likes",
            model: "User",
            populate: {
              path: "user",
              select: "firstName",
              model: "User"
            }
          },
          {
            path: "comments",
            model: "Comment",
            options: { sort: { date: -1 } },
            populate: {
              path: "user",
              select: "firstName",
              model: "User"
            }
          }
        ])
        .exec();
      res.status(200).json(allPost);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  }
};
