const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const supabase = require("./db"); // ✅ This is now Supabase

const app = express();

// Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// ✅ REMOVE THIS MYSQL CODE COMPLETELY:
// db.getConnection()
//   .then((connection) => {
//     console.log("✅ Database connected successfully!");
//     connection.release();
//   })
//   .catch((err) => {
//     console.error("❌ DATABASE CONNECTION FAILED.", err);
//     process.exit(1);
//   });

// ✅ ADD SUPABASE CONNECTION TEST INSTEAD:
console.log("✅ Supabase client initialized!");

// Test Supabase connection
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count');
    
    if (error) {
      console.error("❌ Supabase connection test failed:", error.message);
    } else {
      console.log("✅ Supabase connected successfully!");
      console.log("Users count:", data[0].count);
    }
  } catch (err) {
    console.error("❌ Error testing Supabase connection:", err);
  }
}

testSupabaseConnection();

// Routes
app.use("/api/auth", authRoutes);

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
    const { data, error } = await supabase
      .from('users')
      .select('count');
    
    if (error) {
      res.status(500).json({ 
        status: '❌ Error', 
        database: 'Disconnected',
        error: error.message 
      });
    } else {
      res.json({ 
        status: '✅ OK', 
        database: 'Connected',
        users_count: data[0].count,
        timestamp: new Date().toISOString() 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: '❌ Error', 
      database: 'Disconnected',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));