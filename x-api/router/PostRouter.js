const express = require("express");
const PostController = require("../controller/PostController");
const router = express.Router();
const auth = require("../middleware/auth");

router.use(auth).delete("/post/:id", PostController.deletePost);
module.exports = router;
