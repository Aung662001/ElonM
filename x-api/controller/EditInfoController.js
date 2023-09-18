const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.DATABASE_URL);
const db = mongo.db("x");
const xusers = db.collection("users");
const editInfo = async (req, res) => {
  const { _id } = res.locals.user;
  const { name, handle } = req.body;
  try {
    name &&
      (await xusers.updateOne({ _id: new ObjectId(_id) }, { $set: { name } }));

    handle &&
      (await xusers.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { handle } }
      ));
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
module.exports = { editInfo };
