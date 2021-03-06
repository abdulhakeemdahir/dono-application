const { User, Conversation, Message, Post } = require("../models");

module.exports = io => {
  io.use(async (socket, next) => {
    socket.room = socket.handshake.query.room;
    return next();
  });

  //Connect the client to the socket.
  io.on("connection", socket => {
    socket.on("join:server", async username => {
      const user = await User.findOne({ username });
      user.socketId
        ? (socket.id = user.socketId)
        : User.findOneAndUpdate(username, { socketId: socket.id });
      user.socketId = socket.id;
      socket.username = user.username;
    });

    socket.on("chatroom", async userId => {
      const conversations = await Conversation.find({
        participants: userId
      })
        .populate([
          {
            path: "participants",
            select: "username",
            model: "User"
          },
          {
            path: "messages",
            select: "sender content createdAt",
            model: "Message",
            populate: [
              {
                path: "sender",
                select: "username",
                model: "User"
              }
            ]
          }
        ])
        .sort({ updatedAt: -1 });

      if (conversations.length) {
        socket.join(conversations[0].name);
      }

      socket.emit("get-convos", conversations);
    });

    socket.on("join:room", async name => {
      const roomToLeave = Object.keys(socket.rooms)[1];

      if (roomToLeave) {
        socket.leave(roomToLeave);
      }

      socket.join(name);

      const conversation = await Conversation.findOne({ name }).populate([
        {
          path: "participants",
          select: "username",
          model: "User"
        },
        {
          path: "messages",
          select: "sender content createdAt",
          model: "Message",
          populate: [
            {
              path: "sender",
              select: "username",
              model: "User"
            }
          ]
        }
      ]);

      socket.emit("get-convo", conversation);
    });

    socket.on("create:room", async ({ name, participants }) => {
      const search = await Conversation.findOne({ name });

      if (search) {
        return console.log("Convo already made.");
      }

      const newConvo = await Conversation.create({
        name,
        participants
      });
      const convoInfo = await Conversation.findOne({ name }).populate([
        {
          path: "participants",
          select: "username",
          model: "User"
        },
        {
          path: "messages",
          select: "sender content createdAt",
          model: "Message",
          populate: [
            {
              path: "sender",
              select: "username",
              model: "User"
            }
          ]
        }
      ]);

      socket.emit("get-newConvo", convoInfo);
      socket.join(newConvo.name);
    });

    socket.on("get-messages", async name => {
      const conversation = await Conversation.findOne({ name }).populate([
        {
          path: "messages",
          model: "Message"
        }
      ]);

      socket.emit("set-messages", conversation);
    });

    socket.on("send-message", async payload => {
      if (!payload.isPost) {
        const createMessage = await Message.create({
          sender: payload.sender,
          content: payload.content
        });
        const newMessage = await Message.findById(createMessage._id).populate([
          {
            path: "sender",
            select: "username",
            model: "User"
          }
        ]);
        const newConvo = await Conversation.findByIdAndUpdate(
          { _id: payload.parentId },
          { $push: { messages: [{ _id: createMessage.id }] } }
        ).populate([
          {
            path: "participants",
            select: "username _id socketId",
            model: "User"
          },
          {
            path: "messages",
            select: "sender content createdAt",
            model: "Message",
            populate: [
              {
                path: "sender",
                select: "username",
                model: "User"
              }
            ]
          }
        ]);

        socket.join(newConvo.name);

        socket.emit("update-chat", { newMessage, newConvo });
        io.in(newConvo.name).emit("update-chat", {
          newMessage,
          newConvo
        });
        return;
      }

      if (payload.isPost) {
        const posts = await Post.find({})
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
              select: "firstName",
              model: "User"
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
          ]);

        io.emit("update-post", posts);
        return;
      }
    });

    socket.on("send-comment-dashboard", async id => {
      const roomToLeave = Object.keys(socket.rooms)[1];

      if (roomToLeave) {
        socket.leave(roomToLeave);
      }

      socket.join(id);

      const user = await User.findOne({ _id: id })
        .select(
          "firstName lastname username email role profileImg bannerImg following followers posts bio causes"
        )
        .populate([
          {
            path: "following",
            select: "firstName",
            model: "User"
          },
          {
            path: "followers",
            select: "firstName",
            model: "User"
          },
          {
            path: "posts",
            model: "Post",
            options: { sort: { date: -1 } },
            populate: [
              {
                path: "author",
                select: "firstName",
                model: "User"
              },
              {
                path: "likes",
                select: "firstName",
                model: "User"
              },
              {
                path: "hashtags",
                model: "Hashtag"
              },
              {
                path: "comments",
                model: "Comment",
                options: { sort: { date: -1 } },
                populate: [
                  {
                    path: "user",
                    select: "firstName",
                    model: "User"
                  }
                ]
              }
            ]
          },
          {
            path: "causes",
            model: "Cause",
            options: { sort: { date: -1 } },
            populate: [
              {
                path: "author",
                select: "firstName",
                model: "User"
              },
              {
                path: "likes",
                select: "firstName",
                model: "User"
              }
            ]
          }
        ]);

      io.emit("update-dashboard", user);
    });

    socket.on("disconnect", () => {
      console.log("user has left.");
    });
  });
};
