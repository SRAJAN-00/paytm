const mongoose = require("mongoose");
const { User, Account } = require("./db");

async function createUsers() {
  try {
    // Connect to database
    await mongoose.connect("mongodb://127.0.0.1:27017/paytm");
    console.log("Connected to MongoDB");

    // Sample users data
    const users = [
      {
        username: "john_doe",
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "password123",
        pin: "1234"
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        firstName: "Jane",
        lastName: "Smith", 
        password: "password123",
        pin: "5678"
      },
      {
        username: "alice_wonder",
        email: "alice@example.com",
        firstName: "Alice",
        lastName: "Wonder",
        password: "password123",
        pin: "9999"
      },
      {
        username: "bob_builder",
        email: "bob@example.com",
        firstName: "Bob",
        lastName: "Builder",
        password: "password123",
        pin: "1111"
      },
      {
        username: "charlie_brown",
        email: "charlie@example.com",
        firstName: "Charlie",
        lastName: "Brown",
        password: "password123",
        pin: "2222"
      }
    ];

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users`);

    // Create accounts with initial balance for each user
    const accounts = createdUsers.map(user => ({
      userId: user._id,
      balance: Math.floor(Math.random() * 10000) + 1000 // Random balance between 1000-11000
    }));

    const createdAccounts = await Account.insertMany(accounts);
    console.log(`Created ${createdAccounts.length} accounts`);

    // Display created users with their balances
    console.log("\nCreated Users:");
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      const account = createdAccounts[i];
      console.log(`${user.firstName} ${user.lastName} (${user.username}) - Balance: ₹${account.balance} - PIN: ${user.pin}`);
    }

    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  } catch (error) {
    console.error("Error creating users:", error);
  }
}

createUsers();