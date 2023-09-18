const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.DATABASE_URL);
const db = mongo.db("x");
const xusers = db.collection("users");
const searchUser = async (req, res) => {
  const text = req.body.text;
  console.log(text);
  try {
    let users = await xusers
      .aggregate([
        {
          $match: {
            name: new RegExp(`${text}`, "i"),
          },
        },
        {
          $limit: 8,
        },
      ])
      .toArray();
    if (users) {
      users = users.map((user) => {
        delete user.password;
        return user;
      });
    }
    res.send(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
module.exports = { searchUser };
