const logger = require('../helpers/logger');
const { delay } = require('../helpers/util');
const { response, request } = require('express');

const DatosCache = {

  generar: async function(req = request, res = response) {
    const msgLocation = 'Controllers::DatosCache::generar()';
    logger.info('Mensaje recibido por GET', msgLocation);
    logger.trace(`req.headers: ${JSON.stringify(req.headers)}`, msgLocation);
    logger.trace(`req.ip: ${JSON.stringify(req.ip)}`, msgLocation);
    logger.trace(`req.ips: ${JSON.stringify(req.ips)}`, msgLocation);
    logger.trace(`req.params: ${JSON.stringify(req.params)}`, msgLocation);
    logger.trace(`req.query: ${JSON.stringify(req.query)}`, msgLocation);
    logger.trace(`req.body: ${JSON.stringify(req.body)}`, msgLocation);

    logger.debug(`Mensaje original: ${JSON.stringify(req.body)}`, msgLocation);
    let objMensaje = req.body;

    const datoid = req.params.datoid;
    try {
      let respuesta = {
        id: datoid,
      };

      if (process.env.DELAY_ENABLED === 'true') {
        let max = parseInt(process.env.DELAY_MAX, 10);
        let min = parseInt(process.env.DELAY_MIN, 10);
        let ms = Math.floor(Math.random() * (max - min + 1)) + min;
        logger.debug(`Tiempo espera: ${ms} ms`, msgLocation);
        await delay(ms);
      }

      logger.debug(`Respuesta: ${JSON.stringify(respuesta)}`, msgLocation);
      return res.status(200).json(respuesta);

    } catch (err) {
      logger.logCatch(err, `${msgLocation} catch`);
      return res.status(500).json({ code: 500, message: 'Error Interno' });
    }
  },
};

module.exports = DatosCache;

