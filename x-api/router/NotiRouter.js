const express = require("express");
const NotiController = require("../controller/NotiController");
const router = express.Router();
const auth = require("../middleware/auth");

router.use(auth).get("/", NotiController.getNoti);
module.exports = router;
