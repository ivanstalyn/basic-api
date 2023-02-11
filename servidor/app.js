require('dotenv').config();
const { shutdown } = require('./helpers/apagar');
const Server = require('./models/server');
const servidor = new Server();
servidor.listen();

const salidaManager = shutdown(servidor, {
  coredump: false,
  timeout: 1500,
});

process.on('uncaughtException', salidaManager(1, 'Unexpected Error'));
process.on('unhandledRejection', salidaManager(1, 'Unhandled Promise'));
process.on('SIGTERM', salidaManager(0, 'SIGTERM'));
process.on('SIGINT', salidaManager(0, 'SIGINT'));
