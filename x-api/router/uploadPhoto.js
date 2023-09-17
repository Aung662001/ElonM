const express = require("express");
const router = express.Router();
const UploadController = require("../controller/UploadController");
const multer = require("multer");
const upload = multer({ dest: "images/" });
router.use(upload.single("photo")).post("/:id", UploadController.uploadPhoto);

module.exports = router;
