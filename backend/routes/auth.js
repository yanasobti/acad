const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute(
      "SELECT user_id, name, email, password, role FROM Users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) return res.status(401).json({ message: "Invalid email" });

    const user = rows[0];

    // abhi plaintext check
    if (user.password !== password) return res.status(401).json({ message: "Wrong password" });

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

module.exports = router;
