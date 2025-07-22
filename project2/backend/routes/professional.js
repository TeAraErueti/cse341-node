import express from 'express';
import { getData } from '../controllers/professional.js';

const router = express.Router();

router.get('/', getData);

export {router};