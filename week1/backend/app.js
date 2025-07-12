import express from 'express';
<<<<<<< HEAD
import { router as professionalRoutes } from './routes/professional.js';
=======
import professionalRoutes from './routes/professional.js';  // default import
>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
import { initDb } from './db/connect.js';

const app = express();
const port = process.env.PORT || 8080;

<<<<<<< HEAD
app.use(express.json()); // built-in body parsing

=======
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

// Enable CORS for all origins
>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

<<<<<<< HEAD
app.use('/professional', professionalRoutes);
=======
// Use the professional routes under /api/professionals
app.use('/api/user', professionalRoutes);
>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9

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

<<<<<<< HEAD
=======

>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
