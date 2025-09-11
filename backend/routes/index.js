const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

console.log("Routes index loaded");
console.log("UserRouter:", typeof userRouter);
console.log("AccountRouter:", typeof accountRouter);

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
module.exports = router;
