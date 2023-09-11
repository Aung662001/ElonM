const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("x");
const xnotis = db.collection("notis");
const getNoti = async (req, res) => {
  const { _id } = res.locals.user;
  if (!_id) return res.sendStatus(400);
  try {
    let notis = await xnotis
      .aggregate([
        { $match: { owner: new ObjectId(_id) } },
        { $sort: { _id: -1 } },
        { $limit: 40 },
        {
          $lookup: {
            localField: "actor",
            from: "users",
            as: "user",
            foreignField: "_id",
          },
        },
      ])
      .toArray();
    res.send(notis);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
module.exports = { getNoti };
