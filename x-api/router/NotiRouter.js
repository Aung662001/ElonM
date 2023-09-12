const express = require("express");
const NotiController = require("../controller/NotiController");
const router = express.Router();
const auth = require("../middleware/auth");

router
  .use(auth)
  .post("/new", NotiController.addNewNoti)
  .get("/", NotiController.getNoti)
  .put("/read/:id", NotiController.readNoti);
module.exports = router;
