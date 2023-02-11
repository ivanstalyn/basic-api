const { Router } = require('express');
const { healthGet } = require('../controllers');
const router = Router();
router.get('/health', healthGet);
module.exports = router;
