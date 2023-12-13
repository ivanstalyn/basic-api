const express = require('express');
const cors = require('cors');
const logger = require('../helpers/logger');
const { rutas } = require('../config/rutas');

class Server {

  constructor() {
    this.app = express();
    this.insHTTP = null;
    this.port = process.env.PUERTO_HTTP;

    this.rutas = rutas;

    this.middlewares();
    this.routes();
  }

  middlewares() {

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));

  }

  routes() {

    for (let key in this.rutas) {
      if (this.rutas.hasOwnProperty(key)) {
        logger.info('Cargando ' + key + ' sobre endpoint ' + this.rutas[key].url, 'Server.routes()');
        this.app.use(this.rutas[key].url, require(this.rutas[key].def));
      }
    }
  }

  listen() {
    this.insHTTP = this.app.listen(this.port, () => {
      console.info('Aplicación basic-api está corriendo en puerto: ', this.port);
    });

  }
}

module.exports = Server;
