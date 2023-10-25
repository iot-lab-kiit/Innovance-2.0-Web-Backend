import express from 'express';
import { addResults, createMovieRecommendation, getAllMoviePrompts, getPromptsIn7Days } from '../controllers/movie.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', [auth], createMovieRecommendation);
router.get('/latest', [auth], getPromptsIn7Days);
router.get('/', getAllMoviePrompts);
router.patch('/:id', [auth], addResults);

export default router;