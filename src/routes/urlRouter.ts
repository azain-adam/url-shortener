import express from 'express';
import {
  handleGenerateUrl,
  handleGetAnalytics,
  handleRedirectUrl,
} from '../controllers/urlController';

export const router = express.Router();

router.post('/', handleGenerateUrl);
router.get('/:shortId', handleRedirectUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
