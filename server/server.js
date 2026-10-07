require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const wishlistRoutes = require('./routes/wishlist');
const reminderRoutes = require('./routes/reminders');
const aiRoutes = require('./routes/ai');
const pincodeRoutes = require('./routes/pincode');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl) or if origin is allowed or on cloudflare preview
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.pages.dev') || origin.endsWith('.onrender.com')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive for easy development and deployment
    }
  },
  credentials: true
}));

app.use(express.json());

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pincode', pincodeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'GiftMate Express Backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root API greeting
app.get('/', (req, res) => {
  res.json({
    name: 'GiftMate API',
    description: 'Smart Indian Festive AI Gift Finder Backend',
    version: '1.0.0',
    documentation: '/api/health'
  });
});

// Global 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🎁 GiftMate Backend running on http://localhost:${PORT}`);
  console.log(`✨ Environment: ${process.env.NODE_ENV || 'development'}`);
});
