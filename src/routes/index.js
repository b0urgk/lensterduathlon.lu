const e = require('express');
const router = e.Router();
const debug = require('debug')('app:indexRouter')
const langMiddleware = require('../middleware/langMiddleware');
const eventDataMiddleware = require('../middleware/eventDataMiddleware');
const authMiddleware = require('../middleware/auth');
const indexController = require('../controllers/indexController');
const fs = require('fs')

router.use('/:lang(en|de|fr)?', eventDataMiddleware);
router.use('/:lang(en|de|fr)?', langMiddleware)
router.use('/:lang(en|de|fr)?', authMiddleware);

router.get('/:lang(en|de|fr)?', indexController.index)

router.get('/:lang(en|de|fr)?/login', indexController.login)

router.get('/:lang(en|de|fr)?/race-info', indexController.raceInfos)
router.get('/:lang(en|de|fr)?/races', indexController.raceInfos)
router.get('/:lang(en|de|fr)?/races/long-distance', indexController.longDistance)
router.get('/:lang(en|de|fr)?/races/middle-distance', indexController.middleDistance)
router.get('/:lang(en|de|fr)?/races/short-distance', indexController.shortDistance)
router.get('/:lang(en|de|fr)?/races/kids-distance', indexController.miniDistance)


router.get('/:lang(en|de|fr)?/privacy-policy', indexController.privacyPolicy);



router.get('/:lang(en|de|fr)?/volunteers', indexController.tba)

router.get('/:lang(en|de|fr)?/partners', indexController.sponsors)

router.get('/:lang(en|de|fr)?/archive', indexController.tba)

router.get('/:lang(en|de|fr)?/contact', indexController.contact)








module.exports = router;