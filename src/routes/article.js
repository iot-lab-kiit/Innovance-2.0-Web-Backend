import express from 'express';
import { createArticleRecommendation, addResults, getPromptsIn7Days } from '../controllers/article.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', [auth], createArticleRecommendation);
router.patch('/:id', [auth], addResults);
router.get('/latest', [auth], getPromptsIn7Days);

export default router;