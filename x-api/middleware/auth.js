const jwt = require("jsonwebtoken");
const secret = "hahaha";
const auth = function (req, res, next) {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  if (token == null || token == undefined) {
    return res.status(400).json({ msg: "Token require" });
  }
  try {
    const user = jwt.verify(token, secret);
    if (user) {
      res.locals.user = user;
      next();
    } else {
      {
        return res.status(400).json({ msg: "Token is not Valid" });
      }
    }
  } catch (err) {
    res.status(400).json(err.stack);
  }
};
module.exports = auth;
