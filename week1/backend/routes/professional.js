import express from 'express';
import { getData } from '../controllers/professional.js';

const router = express.Router();

router.get('/', getData);

<<<<<<< HEAD
export { router };
=======
export default router;

>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9



