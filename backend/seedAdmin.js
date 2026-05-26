const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminPhone = "0500000000";
    const adminPassword = "123456";

    const existingAdmin = await User.findOne({ phone: adminPhone });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: "Admin User",
      phone: adminPhone,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin user created successfully");
    console.log("Phone: 0500000000");
    console.log("Password: 123456");

    process.exit(0);
  } catch (err) {
    console.error("Failed to seed admin:", err.message);
    process.exit(1);
  }
};

seedAdmin();