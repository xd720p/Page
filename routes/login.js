var User = require('../database/createModels/createUser');
//var HttpError = require('error').HttpError;
//var AuthError = require('routes/user').AuthError;
var async = require('async');

exports.get = function(req, res) {
    res.render('login');
};

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

 
      var l = function (username, password, callback) {
          User.checkPassword(username, password, function(user, err){
              if (err) callback(null, err);
              else {
                 callback(user, null);
              }
          })
      }
      
    l(username, password, function (user, err) {
        if (user) res.send(user);
        else res.status(403).send(err);
    })
  

};

