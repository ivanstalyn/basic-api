const { Router } = require('express');
const TemperaturaController = require('../controllers/temperatura');
const router = Router();
router.post('/temperatura/convertir', TemperaturaController.convertir);
module.exports = router;
