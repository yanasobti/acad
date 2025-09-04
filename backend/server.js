const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Make DB accessible in routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

