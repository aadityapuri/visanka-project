const express = require('express');
const authController = require('../controllers/auth');
const {cookieJwtAuth} = require('../controllers/cookieJwtAuth');

const router = express.Router();

router.post('/register',authController.register);
router.post('/profile', cookieJwtAuth, authController.profile);
router.post('/login', authController.login);

module.exports = router;