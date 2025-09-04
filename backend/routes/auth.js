const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const pool = require("../db"); 


(async () => {
  try {
    const connection = await pool.getConnection(); // ✅ Use pool
    console.log("✅ Database connected successfully!");
    connection.release();
  } catch (err) {
    console.error("❌ DATABASE CONNECTION FAILED.", err);
    process.exit(1);
  }
})();


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.execute(
      "SELECT user_id, name, email, password, role FROM Users WHERE email = ?",
      [email]
    );

    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid email" });

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.user_id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)";
    await pool.execute(query, [name, email, hashedPassword, role]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Error signing up" });
    }
  }
});

module.exports = router;
