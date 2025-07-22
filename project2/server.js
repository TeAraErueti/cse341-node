const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongodb = require('./data/database');
const swaggerRouter = require('./routes/swagger'); // Adjust path if needed
const mainRoutes = require('./routes');

dotenv.config({ path: './project2/.env' });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Swagger UI route
app.use('/api-docs', swaggerRouter);

// Your main app routes
app.use('/', mainRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.stack);
  res.status(500).json({ message: '❌ Internal Server Error', error: err.message });
});

// Connect to DB and start server
mongodb.initDb()
  .then(() => {
    console.log('✅ Connected to database');
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📘 Swagger docs available at http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  });

// Handle uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.error(`🚨 Uncaught Exception:\n${err.stack || err}\nOrigin: ${origin}`);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, '\nReason:', reason);
  process.exit(1);
});
