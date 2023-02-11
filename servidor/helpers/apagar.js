const logger = require('./logger');
const os = require('os');

const shutdown = (server, options = { coredump: false, timeout: 500 }) => {
  const msgLocation = 'helpers::apagar::shutdown()';
  const exit = code => {
    logger.warn(`Reiniciando contenedor ${os.hostname}`, msgLocation);
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code, reason) => (err, promise) => {

    if (err && err instanceof Error) {
      logger.warn(`Apagando servidor http server: [${os.hostname}][${reason}][${err.message}]`, msgLocation);
      logger.logCatch(err, msgLocation);
      server.insHTTP.close(exit);
      setTimeout(exit, options.timeout).unref();
    }
  };
};

module.exports = {
  shutdown,
};
