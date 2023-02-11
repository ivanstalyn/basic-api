const objTools = require('./tools');
const objTemperatura = require('./temperatura');
module.exports = {
  ...objTemperatura,
  ...objTools,
};
