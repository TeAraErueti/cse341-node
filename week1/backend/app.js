import express from 'express';
import { router as professionalRoutes } from './routes/professional.js';
import { initDb } from './db/connect.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // built-in body parsing

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/professional', professionalRoutes);

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

