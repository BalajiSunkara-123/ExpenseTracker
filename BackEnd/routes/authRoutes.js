const express = require('express');
const router = express.Router();

const { register, login, otp } = require('../controllers/authControllers');

router.post('/register', register);
router.post('/login', login);
router.post('/otp', otp);

module.exports = router;
