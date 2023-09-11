const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("x");
const xnotis = db.collection("notis");
const getNoti = async (req, res) => {
  res.json(res.locals);
};
module.exports = { getNoti };
