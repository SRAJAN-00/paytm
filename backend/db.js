const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { string, minLength } = require("zod");

// Load environment variables
dotenv.config();

// Check if MONGODB_URL exists
if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL environment variable is not set");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error:", error));

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
      length: 4,  // Change from minLength to exactly 4
      validate: {
        validator: function(v) {
          return /^\d{4}$/.test(v);  // Exactly 4 digits
        },
        message: 'PIN must be exactly 4 digits'
      }
    }
  },
  {
    timestamps: true,
  }
);

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Account };
