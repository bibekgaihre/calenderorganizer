var session = require('express-session');
var bodyParser = require('body-parser');

exports.loginuser=  function (req, res, next) {
    //store username and password in session 
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    next();
  };