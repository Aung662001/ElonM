const express = require("express");
const EditInfoController = require("../controller/EditInfoController");
const router = express.Router();
const auth = require("../middleware/auth");

router.use(auth).post("/info", EditInfoController.editInfo);
module.exports = router;
