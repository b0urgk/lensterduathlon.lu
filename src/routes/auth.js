require('dotenv').config();

const e = require('express');
const authController = require('../controllers/authController')

const router = e.Router();

router.post('/login', authController.login);

module.exports = router;