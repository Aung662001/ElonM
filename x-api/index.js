const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "hahaha";

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");

const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xusers = xdb.collection("users");
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers, "header");
  const token = authorization && authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ msg: "Token require" });
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "Token is not Valid" });
    }
    res.locals.user = user;
    next();
  });
};

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
  return res.sendStatus(500);
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
    //this formatUser contain post-body,like,and formatUser
    return res.json(formatUser);
  } catch (err) {
    return res.sendStatus(500);
  }
});
//post in profile
app.get("/users/:handle", async function (req, res) {
  const { handle } = req.params;
  const user = await xusers.findOne({ handle });
  try {
    const data = await xposts
      .aggregate([
        { $match: { owner: user._id } },
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
    return res.json(formatUser);
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
//"/handle/: "
