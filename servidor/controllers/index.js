const objTools = require('./tools');
const objTemperatura = require('./temperatura');
const objDatosCache = require('./datoscache');
module.exports = {
  ...objTemperatura,
  ...objDatosCache,
  ...objTools,
};
