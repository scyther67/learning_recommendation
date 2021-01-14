const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const path = require('path');
/**
 * @desc Mounting middle wares to app
 * @param app Initialised express application
 */
module.exports = (app) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(/*{origin: 'http://localhost:4200', credentials: true}*/));    
  app.use(helmet());
  // app.use(express.static());
  console.log(path.dirname(__dirname));
  app.use(express.static(path.join(path.dirname(__dirname), 'build')));
  return app;
}
