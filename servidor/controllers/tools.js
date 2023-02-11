const { response, request } = require('express');

const healthGet = async(req = request, res = response) => {

  return res.status(200).json({
    componente: 'basic-api',
    health: 'ok',
  });
};

module.exports = {
  healthGet,
};
