var express = require('express');
var router = express.Router();

//GET home page. 
module.exports = function(app) {
  app.get('/', require('./frontpage'));
  app.get('/login', require('./login').get);
  app.get('/registration', require('./registration').get);
  app.post('/login', require('./login').post);

  //app.post('/logout', require('./logout').post);
};
 