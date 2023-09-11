const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("x");
const xnotis = db.collection("notis");
const xusers = db.collection("users");
const xposts = db.collection("posts");
const follow = async (req, res) => {
  const targetId = req.params.id;
  const { user } = res.locals;
  if (!targetId || !user) res.sendStatus(400);
  const targetUser = await xusers.findOne({ _id: new ObjectId(targetId) });
  const authUser = await xusers.findOne({ _id: new ObjectId(user._id) });

  targetUser.followers = targetUser.follower || [];
  authUser.following = authUser.following || [];

  targetUser.followers = [...targetUser.followers, new ObjectId(user._id)];
  authUser.following = [...authUser.following, new ObjectId(targetId)];

  try {
    await xusers.updateOne(
      { _id: new ObjectId(targetId) },
      { $set: { followers: targetUser.followers } }
    );
    await xusers.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { following: authUser.following } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const unfollow = async (req, res) => {
  const targetId = req.params.id;
  const { _id } = res.locals?.user;
  if (!targetId || !_id) return res.sendStatus(400);

  const targetUser = await xusers.findOne({ _id: new ObjectId(targetId) });
  const authUser = await xusers.findOne({ _id: new ObjectId(_id) });

  targetUser.followers = targetUser.followers || [];
  authUser.following = authUser.following || [];

  targetUser.followers = targetUser.followers.filter((follower) => {
    return follower.toString() != _id.toString();
  });
  authUser.following = authUser.following.filter((follow) => {
    return follow.toString() !== targetId.toString();
  });
  try {
    await xusers.updateOne(
      { _id: new ObjectId(targetId) },
      { $set: { followers: targetUser.followers } }
    );
    await xusers.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { following: authUser.following } }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
module.exports = { follow, unfollow };
