const express = require("express");
require("dotenv").config();
const app = express();
const NotiRouter = require("./router/NotiRouter");
const Following = require("./router/Following");
const uploadCoverRouter = require("./router/uploadCover");
const uploadPhotoRouter = require("./router/uploadPhoto");
const searchUserRouter = require("./router/SearchUser");
const editProfileInfoRouter = require("./router/editProfileInfo");
const PostRouter = require("./router/PostRouter");

const cors = require("cors");
app.use(cors());
require("express-ws")(app);
const clients = [];
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "hahaha";
const auth = require("./middleware/auth");

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.DATABASE_URL);

const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xusers = xdb.collection("users");

app.ws("/connect", (wss, req) => {
  wss.on("message", (token) => {
    console.log("message received");
    jwt.verify(token, secret, (err, user) => {
      if (err) return false;

      if (!clients.find((client) => client.uid == user._id)) {
        wss.uid = user._id;
        clients.push(wss);
        console.log("added new Client");
      }
    });
  });
});
app.use("/images", express.static("images"));
app.post("/login", async (req, res) => {
  const { handle, password } = req.body;
  if (!handle || !password) {
    return res.status(400).json({ msg: "handle and password required" });
  }
  const user = await xusers.findOne({ handle: handle.trim() });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign(user, secret);
      return res.json({ token, user });
    }
    return res.status(400).json({ msg: "password is not valid" });
  }
  return res.status(500).json({ msg: "User not found" });
});

app.post("/users", async (req, res) => {
  const { name, handle, password, profile } = req.body;
  if (!name || !handle || !password) {
    return res.status(400).json({ msg: "require: name , password, handle" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await xusers.insertOne({
      name,
      handle,
      profile,
      password: hash,
    });
    return res
      .status(200)
      .json({ _id: result.insertedId, name, handle, profile });
  } catch {
    return res.status(500);
  }
});
app.get("/posts", auth, async function (req, res) {
  try {
    const data = await xposts
      .aggregate([
        { $match: { type: "post" } },
        {
          $lookup: {
            localField: "owner",
            from: "users",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            localField: "_id",
            foreignField: "origin",
            from: "posts",
            as: "comments",
          },
        },
        { $sort: { created: -1 } },
        { $limit: 20 },
      ])
      .toArray();
    const formatUser = data.map((post) => {
      post.user = post.user[0];
      delete post.user.password;
      return post;
    });
    //this formatUser contain post-body,like,and formatUser
    return res.json(formatUser);
  } catch (err) {
    return res.sendStatus(500);
  }
});
//post in profile
app.get("/users/:handle/profile", async function (req, res) {
  const { handle } = req.params;
  const user = await xusers.findOne({ handle });
  try {
    const data = await xposts
      .aggregate([
        { $match: { owner: user._id, type: "post" } },
        {
          $lookup: {
            localField: "owner",
            from: "users",
            foreignField: "_id",
            as: "user",
          },
        },

        { $limit: 20 },
      ])
      .toArray();
    const formatUser = data.map((post) => {
      post.user = post.user[0];
      delete post.user.password;
      return post;
    });
    return res.json({ user, formatUser });
  } catch (err) {
    return res.sendStatus(500);
  }
});
//
//singlePost
app.get("/posts/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const data = await xposts
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            localField: "owner",
            from: "users",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "likes",
            foreignField: "_id",
            as: "liked_users",
          },
        },

        {
          $lookup: {
            localField: "_id",
            from: "posts",
            foreignField: "origin",
            as: "comments",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "owner",
                  foreignField: "_id",
                  as: "user",
                },
              },
              { $sort: { created: -1 } },
              {
                $lookup: {
                  localField: "_id",
                  from: "posts",
                  foreignField: "origin",
                  as: "comments",
                  pipeline: [
                    {
                      $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "user",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        { $limit: 20 },
      ])
      .toArray();
    const format = data[0];
    format.user = format.user[0];
    delete format.user.password;
    if (format.comments.length) {
      format.comments = format.comments.map((comment) => {
        comment.user = comment.user[0];
        return comment;
      });
    }
    return res.json(format);
  } catch (err) {
    return res.sendStatus(500);
  }
});
//posts
app.get("/verify", auth, function (req, res, next) {
  res.json(res.locals.user);
});

app.get("/users/:handle", async function (req, res) {
  const { handle } = req.params;

  try {
    const user = await xusers.findOne({ handle });

    const data = await xposts
      .aggregate([
        {
          $match: { owner: user._id },
        },
        {
          $lookup: {
            localField: "owner",
            from: "users",
            foreignField: "_id",
            as: "user",
            // pipeline: [
            //   {
            //     $lookup: {
            //       localField: "followers",
            //       from: "users",
            //       foreignField: "_id",
            //       as: "followeringUser",
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "users",
            //       localField: "following",
            //       foreignField: "_id",
            //       as: "fgUser",
            //     },
            //   },
            // ],
          },
        },

        {
          $limit: 20,
        },
      ])
      .toArray();

    const format = data.map((post) => {
      post.user = post.user[0];
      delete post.user.password;

      return post;
    });

    return res.json(format);
  } catch (err) {
    return res.sendStatus(500);
  }
});
app.listen(8888, () => {
  console.log("X api running at 8888");
});

app.put("/posts/:id/like", auth, async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  const _id = new ObjectId(id);
  const user_id = new ObjectId(user._id);

  const post = await xposts.findOne({ _id });
  if (!post) return res.send(400);

  if (post.likes.find((like) => like.toString() == user_id.toString())) {
    post.likes = post.likes.filter(
      (like) => like.toString() !== user_id.toString()
    );
  } else {
    post.likes.push(user_id);
  }
  const result = await xposts.updateOne({ _id }, { $set: post });

  res.json(result);
});
//get comments of a post
app.get("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  const post = await xposts.findOne(_id);

  if (!post) return res.sendStatus(400);

  try {
    const comments = await xposts
      .aggregate([
        {
          $match: {
            origin: _id,
          },
        },
        {
          $lookup: {
            localField: "owner",
            from: "users",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .toArray();
    const format = comments.map((comment) => {
      comment.user = comment.user[0];
      delete comment.user.password;
      return comment;
    });
    res.json(format);
  } catch {
    res.status(500);
  }
});
//follower
app.get("/user/:handle/follower", async (req, res) => {
  const { handle } = req.params;
  if (!handle) return res.send(500);
  try {
    const user = await xusers
      .aggregate([
        { $match: { handle } },
        {
          $lookup: {
            foreignField: "_id",
            localField: "following",
            from: "users",
            as: "followingUsers",
          },
        },
        {
          $lookup: {
            foreignField: "_id",
            localField: "followers",
            from: "users",
            as: "followerUsers",
          },
        },
      ])
      .toArray();
    res.send(user[0]);
  } catch (err) {
    res.send(500);
  }
});
//new post
app.post("/new/post", async (req, res) => {
  const { content, type, userId, origin } = req.body;
  if (!content || !type || !userId)
    return res.status(400).json({ message: "All fields are required" });
  const data = {
    type,
    body: content,
    owner: new ObjectId(userId),
    created: new Date(),
    likes: [],
  };
  if (origin) {
    data.origin = new ObjectId(origin);
  }
  try {
    const result = await xposts.insertOne(data);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
});
const clientInsert = (req, res, next) => {
  req.clients = clients;
  next();
};
app.use("/following", Following);
app.use("/notis", clientInsert, NotiRouter);
app.use("/upload/coverImage", uploadCoverRouter);
app.use("/upload/photo", uploadPhotoRouter);
app.use("/searchUser", searchUserRouter);
app.use("/edit", editProfileInfoRouter);
app.use("/delete", PostRouter);
