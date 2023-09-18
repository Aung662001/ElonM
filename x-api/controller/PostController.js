const { MongoClient, ObjectId } = require("mongodb");
const router = require("../router/NotiRouter");
const mongo = new MongoClient(process.env.DATABASE_URL);
const db = mongo.db("x");
const xnotis = db.collection("notis");
const xusers = db.collection("users");
const xposts = db.collection("posts");
const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await xposts.deleteOne({ _id: new ObjectId(id) });
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
module.exports = { deletePost };
