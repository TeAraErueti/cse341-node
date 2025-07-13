const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const swaggerRouter = require('./routes/swagger');
const mainRoutes = require('./routes');

const app = express();

dotenv.config({ path: './week1/.env' });

console.log('✅ DEBUG CHECK');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('DB_NAME:', process.env.DB_NAME);

const port = process.env.PORT || 3000;

// Log every incoming request
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// JSON parsing
app.use(express.json());
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// ✅ Mount Swagger UI ONLY at /api-docs
app.use('/api-docs', swaggerRouter);

// Simple test route
app.get('/', (req, res) => {
  console.log('✅ Direct root route hit in server.js');
  res.send('Hello World');
});

// ✅ Mount main routes (e.g. /users) AFTER Swagger
app.use('/', mainRoutes);

// ✅ Start server after DB connects
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
