const fs = require("fs");
const path = require("path");
const removeOldPhoto = (name) => {
  if (fs.existsSync(path.join(__dirname + "/.." + "/images/" + name))) {
    fs.unlink(path.join(__dirname + "/.." + "/images/" + name), (err) => {
      console.log(err);
    });
  }
};
module.exports = removeOldPhoto;
