const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const app = express();
const db = require("./db");

// Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// ✅ ADD THESE ROUTES:
app.get('/', (req, res) => {
  res.json({ 
    message: 'Acadence Backend API is running! 🚀',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login'
      },
      health: 'GET /health'
    }
  });
});

app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const connection = await db.getConnection();
    connection.release();
    
    res.json({ 
      status: '✅ OK', 
      database: 'Connected',
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    res.status(500).json({ 
      status: '❌ Error', 
      database: 'Disconnected',
      error: error.message 
    });
  }
});

// Test DB connection
db.getConnection()
  .then((connection) => {
    console.log("✅ Database connected successfully!");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ DATABASE CONNECTION FAILED.", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));