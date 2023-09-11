const express = require("express");
const FollowingController = require("../controller/FollowingController");
const router = express.Router();
const auth = require("../middleware/auth");

router.use(auth).put("/follow/:id", FollowingController.follow);
router.use(auth).put("/unfollow/:id", FollowingController.unfollow);
module.exports = router;
