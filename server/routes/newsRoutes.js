// routes/newsRoutes.js
import express from 'express';
import multer from 'multer';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import { protect } from '../middleware/auth.js';
import fetch from 'node-fetch';

const router = express.Router();

// Multer setup for image uploads (max 1MB, JPEG/PNG only)
const upload = multer({
  limits: { fileSize: 1024 * 1024 }, // 1MB
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images are allowed'), false);
    }
  },
});

// @route   GET /news/external
// @desc    Fetch live news from NewsAPI.org
// @access  Public
router.get('/external', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'API key missing in environment' });
    }

    const { country = 'us', category } = req.query;
    const categoryParam = category ? `&category=${category}` : '';

    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}${categoryParam}&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching external news:', error.message);
    res.status(500).json({ message: error.message || 'Failed to fetch external news' });
  }
});

// @route   GET /news
// @desc    Get all news from DB
// @access  Public
router.get('/', getNews);

// @route   POST /news
// @desc    Create news post
// @access  Private (auth required)
router.post('/', protect, upload.single('image'), createNews);

// @route   GET /news/:id
// @desc    Get a single news post
// @access  Public
router.get('/:id', getNewsById);

// @route   PUT /news/:id
// @desc    Update a news post
// @access  Private (auth required)
router.put('/:id', protect, upload.single('image'), updateNews);

// @route   DELETE /news/:id
// @desc    Delete a news post
// @access  Private (auth required)
router.delete('/:id', protect, deleteNews);

export default router;