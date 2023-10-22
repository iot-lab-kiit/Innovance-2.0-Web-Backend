import express from 'express';
import { addResults, createMovieRecommendation, getAllMoviePrompts, getPromptsIn7Days } from '../controllers/recommendation.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/movie', [auth], createMovieRecommendation);
router.get('/movie', getAllMoviePrompts);
router.put('/movie/:id', [auth], addResults);
router.get('/movie/latest', [auth], getPromptsIn7Days);

export default router;