const { MongoClient, ObjectId } = require("mongodb");
const removeOldPhoto = require("../ultis/removeOldPhoto");
const mongo = new MongoClient(process.env.DATABASE_URL);
const db = mongo.db("x");
const xusers = db.collection("users");
const uploadCover = async (req, res) => {
  const fileName = req.file?.filename;
  const { id } = req.params;
  if (!id || !fileName) return res.sendStatus(400);

  try {
    const user = await xusers.findOne({ _id: new ObjectId(id) });
    const oldName = user.coverImage;
    if (oldName) {
      removeOldPhoto(oldName);
    }
    await xusers.updateOne(
      { _id: new ObjectId(id) },
      { $set: { coverImage: fileName } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const uploadPhoto = async (req, res) => {
  const fileName = req.file?.filename;
  const { id } = req.params;
  if (!id || !fileName) return;

  try {
    const user = await xusers.findOne({ _id: new ObjectId(id) });
    const oldName = user.profilePhoto;
    if (oldName) {
      removeOldPhoto(oldName);
    }
    await xusers.updateOne(
      { _id: new ObjectId(id) },
      { $set: { profilePhoto: fileName } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
module.exports = { uploadCover, uploadPhoto };
