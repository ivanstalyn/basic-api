const { Router } = require('express');
const TemperaturaController = require('../controllers/temperatura');
const DatosCacheController = require('../controllers/datoscache');
const router = Router();
router.post('/temperatura/convertir', TemperaturaController.convertir);
router.get('/datos/cache/:datoid', DatosCacheController.generar);
module.exports = router;
