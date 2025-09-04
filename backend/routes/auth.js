const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const supabase = require("../db");

// LOGIN - with debug logs
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  console.log("🔐 Login attempt for:", email);
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password, name, role')
      .eq('email', email)
      .single();

    console.log("📊 User found:", user ? "Yes" : "No");
    console.log("❌ Error:", error);

    if (error || !user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // DEBUG: See what's being compared
    console.log("🔑 Input password:", password);
    console.log("💾 Stored password:", user.password);
    console.log("📏 Stored password length:", user.password.length);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password match:", isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role, 
        name: user.name,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      token, 
      role: user.role, 
      name: user.name,
      email: user.email,
      id: user.id
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate role
  if (!['student', 'teacher'].includes(role)) {
    return res.status(400).json({ message: "Role must be 'student' or 'teacher'" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          role: role.toLowerCase()
        }
      ])
      .select('id, name, email, role, created_at');

    if (error) {
      if (error.code === '23505') { // Unique violation (email already exists)
        return res.status(400).json({ message: "Email already exists" });
      }
      console.error("Signup error:", error);
      return res.status(500).json({ message: "Error creating account" });
    }

    // Generate token for immediate login after signup
    const token = jwt.sign(
      { 
        id: data[0].id, 
        role: data[0].role, 
        name: data[0].name,
        email: data[0].email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ 
      message: "Account created successfully",
      token,
      role: data[0].role,
      name: data[0].name,
      email: data[0].email,
      id: data[0].id
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

module.exports = router;