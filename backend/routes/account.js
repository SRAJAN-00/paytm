const express = require("express");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({ userId });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }
  res.status(200).json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const transactions = await mongoose.startSession();
  transactions.startTransaction();
  const { toUserId, amount } = req.body;

  if (!toUserId || !amount || amount <= 0) {
    await transactions.abortTransaction();
    transactions.endSession();
    return res.status(400).json({ message: "Invalid request body" });
  }

  // Check sender's account and balance
  const fromAccount = await Account.findOne({ userId: req.userId }).session(
    transactions
  );
  if (!fromAccount) {
    await transactions.abortTransaction();
    transactions.endSession();
    return res.status(404).json({ message: "Sender account not found" });
  }

  // Check if sender has enough balance (minimum 100 after transaction)
  if (fromAccount.balance - amount < 100) {
    await transactions.abortTransaction();
    transactions.endSession();
    return res.status(400).json({
      message: "Insufficient balance. You must maintain a minimum balance of ₹100",
    });
  }

  const toAccount = await Account.findOne({ userId: toUserId }).session(
    transactions
  );
  if (!toAccount) {
    await transactions.abortTransaction();
    transactions.endSession();
    return res.status(404).json({ message: "Recipient account not found" });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(transactions);

  await Account.updateOne(
    { userId: toUserId },
    { $inc: { balance: amount } }
  ).session(transactions);

  await transactions.commitTransaction();
  transactions.endSession();
  res.status(200).json({ message: "Transfer successful" });
});

module.exports = router;
