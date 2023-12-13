const logger = require('../helpers/logger');
const { delay } = require('../helpers/util');
const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');

const Temperatura = {

  convertir: async function(req = request, res = response) {
    const msgLocation = 'Controllers::Temperatura::convertir()';
    logger.info('Mensaje recibido por GET', msgLocation);
    logger.trace(`req.headers: ${JSON.stringify(req.headers)}`, msgLocation);
    logger.trace(`req.ip: ${JSON.stringify(req.ip)}`, msgLocation);
    logger.trace(`req.ips: ${JSON.stringify(req.ips)}`, msgLocation);
    logger.trace(`req.params: ${JSON.stringify(req.params)}`, msgLocation);
    logger.trace(`req.query: ${JSON.stringify(req.query)}`, msgLocation);
    logger.trace(`req.body: ${JSON.stringify(req.body)}`, msgLocation);

    logger.debug(`Mensaje original: ${JSON.stringify(req.body)}`, msgLocation);
    let objMensaje = req.body;

    if (!objMensaje.valor){
      return res.status(400).json({ code: 400, message: 'No hay propiedad valor' });

    }

    try {
      let respuesta = {
        id: uuidv4(),
        valor: 0.0,
        unidad: 'na',
        texto: 'na',
      };

      if (objMensaje.to === 'C'){
        logger.debug(`Transformado a  original: ${JSON.stringify(req.body)}`, msgLocation);
        respuesta.valor = (parseFloat(objMensaje.valor) - 32.0) * 5.0 / 9.0;
        respuesta.unidad = 'Celcios';

      } else if (objMensaje.to === 'F'){
        respuesta.valor = (parseFloat(objMensaje.valor) * 9.0 / 5.0) + 32.0;
        respuesta.unidad = 'Fahrenheit';
      }

      respuesta.texto = `${respuesta.valor} ${respuesta.unidad}`;

      if (objMensaje.delay) {
        let max = objMensaje.delay.min;
        let min = objMensaje.delay.max;
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

module.exports = Temperatura;

