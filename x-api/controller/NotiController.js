const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.DATABASE_URL);
const db = mongo.db("x");
const xnotis = db.collection("notis");
const xusers = db.collection("users");
const xposts = db.collection("posts");
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

    const format = notis.map((noti) => {
      noti.user = noti.user[0];
      delete noti.user.password;
      return noti;
    });
    res.send(format);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const readNoti = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400);
  try {
    const result = await xnotis.updateOne(
      { _id: new ObjectId(id) },
      { $set: { read: true } }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const addNewNoti = async (req, res) => {
  const { type, target } = req.body;
  if (!type || !target) return res.sendStatus(400);
  const ownerPost = await xposts.findOne({ _id: new ObjectId(target) });

  const { _id: actorId } = res.locals.user;
  //for unlike
  if (type === "like") {
    if (ownerPost.likes.find((like) => like.toString() == actorId)) {
      return res.sendStatus(304);
    }
  }

  //for she/heself
  if (actorId.toString() == ownerPost.owner.toString()) {
    return res.sendStatus(304);
  }
  const noti = {
    type,
    actor: new ObjectId(actorId),
    msg: `${type} your post.`,
    target: new ObjectId(target),
    owner: new ObjectId(ownerPost.owner),
    read: false,
    created: new Date(),
  };
  try {
    await xnotis.insertOne(noti);
    req.clients.map((client) => {
      if (client.uid == ownerPost.owner.toString()) {
        console.log("noti update");
        client.send("noti updated");
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
module.exports = { getNoti, readNoti, addNewNoti };
