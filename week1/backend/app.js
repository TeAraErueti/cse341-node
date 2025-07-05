import express from 'express';
import professionalRoutes from './routes/professional.js';  // default import
import { initDb } from './db/connect.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

// Enable CORS for all origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Use the professional routes under /api/professionals
app.use('/api/user', professionalRoutes);

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


