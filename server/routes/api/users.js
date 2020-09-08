// Dependencies
const express = require('express');
const router = express.Router();

// Auth Middleware
const auth = require('../../middlewares/auth');

// Controllers
const { signup, signin, user } = require('../../controllers/users');

// Routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user', auth, user);

module.exports = router;