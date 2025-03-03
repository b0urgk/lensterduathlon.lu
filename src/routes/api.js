const e = require('express');
const authRouter = require('./auth');
const authMiddleware = require('../middleware/auth');
const apiController = require('../controllers/apiController');


const router = e.Router();

router.use('/auth', authRouter);

router.use(authMiddleware);

router.post('/updateContentLocale', apiController.updateContentLocale)

module.exports = router;