const express = require("express");
const NotiController = require("../controller/NotiController");
const router = express.Router();
const auth = require("../middleware/auth");
const UploadController = require("../controller/UploadController");
const multer = require("multer");
const upload = multer({ dest: "images/" });
router
  .use(upload.single("cover"))
  .post("/coverImage", UploadController.uploadCover);

module.exports = router;
