const express = require('express');
const router = express.Router();
const {createShortUrl, findOriginalUrl,findUrlAnalytics} = require('../controllers/urlController');

// Route to create a new short URL
router.post('/short-url', createShortUrl);
router.get('/:shortId', findOriginalUrl);
router.get('/analytics/:shortId/', findUrlAnalytics);

module.exports = router;