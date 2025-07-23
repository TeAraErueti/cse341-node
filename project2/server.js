const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongodb = require('./data/database');
const swaggerRouter = require('./routes/swagger');
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

// Serve swagger.json dynamically and with error handling
app.get('/swagger.json', (req, res) => {
  // Adjust the path to wherever your swagger.json actually is
  const swaggerPath = path.join(__dirname, 'project2', 'swagger.json');
  fs.access(swaggerPath, fs.constants.R_OK, (err) => {
    if (err) {
      console.error('❌ swagger.json file not found or not readable:', swaggerPath);
      return res.status(404).json({ error: 'swagger.json not found' });
    }
    res.sendFile(swaggerPath);
  });
});

// Debug route to check directory and swagger.json presence
app.get('/debug', (req, res) => {
  const dir = __dirname;
  const swaggerExists = fs.existsSync(path.join(__dirname, 'project2', 'swagger.json'));
  res.json({ dir, swaggerExists });
});

// Swagger UI route
app.use('/api-docs', swaggerRouter);

// Your main app routes
app.use('/', mainRoutes);

// List files in project directory for debugging (optional)
app.get('/list-files', (req, res) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ files });
  });
});

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
