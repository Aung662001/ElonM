const express = require("express");
const SearchUserController = require("../controller/SearchUserController");
const router = express.Router();

router.post("/", SearchUserController.searchUser);
module.exports = router;
