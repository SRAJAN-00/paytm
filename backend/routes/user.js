const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();
const signUpBodySchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const signInBodySchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  console.log("Request body:", req.body);
  const result = signUpBodySchema.safeParse(req.body);
  console.log("Validation result:", result);

  if (!result.success) {
    console.log("Validation errors:", result.error.errors);
    return res.status(400).json({
      message: "Invalid request body",
      errors: result.error.errors,
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).json({ message: "username already exists" });
  }

  const newUser = await User.create(req.body);
  const userId = newUser._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(201).json({ message: "User created successfully", token });
});

router.post("/signin", async (req, res) => {
  const { success } = signInBodySchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  // Simple password comparison (you should hash passwords in production)
  if (user.password !== req.body.password) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(200).json({ message: "User signed in successfully", token });
});

const updateProfileBodySchema = z.object({
  email: z.string().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateProfileBodySchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { $set: req.body },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Profile updated successfully", user: updatedUser });
});

router.get("/", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });
  res.status(200).json({
    user: users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    })),
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      users: users.map((user) => ({
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
