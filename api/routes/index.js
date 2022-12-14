const express = require("express");
const router = express.Router();

const users = require("./user");
const favorite = require("./favorite")


router.use("/user", users);
router.use("/favorite", favorite);




module.exports = router;