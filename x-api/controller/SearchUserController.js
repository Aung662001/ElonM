const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("x");
const xusers = db.collection("user");
const searchUser = async (req, res) => {
  const text = req.body.text;
  console.log(text);
  await res.sendStatus(200);
};
module.exports = { searchUser };
