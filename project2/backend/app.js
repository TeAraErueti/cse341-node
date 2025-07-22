import express from 'express';
import { router as professionalRoutes } from './routes/professional.js';
import { initDb } from './db/connect.js';

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Default root route
app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

// Use the professional routes under /api/user
app.use('/api/users', professionalRoutes);

// Initialize DB and start server
initDb((err) => {
  if (err) {
    console.error('Failed to connect to database', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  }
});
