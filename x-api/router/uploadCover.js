const express = require("express");
const router = express.Router();
const UploadController = require("../controller/UploadController");
const multer = require("multer");
const upload = multer({ dest: "images/" });
router.use(upload.single("cover")).post("/:id", UploadController.uploadCover);

module.exports = router;
