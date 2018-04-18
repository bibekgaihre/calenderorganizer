
//authentication process
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

//database validation
var databaseconnection = require('../config/databaseconnection');

passport.use('localuser',new LocalStrategy(
    function (username,password,done) {
        console.log(username);
        console.log(password);
        databaseconnection.query('SELECT password FROM user WHERE email = ?', [username], function (err, results, fields) {

            if (err) { done(err) };
      
            if (results.length === 0) {
              done(null, false);
            }
            else {
              var hash = results[0].password.toString();
              console.log(hash);
              bcrypt.compare(password, hash, function (err, response) {
                if (response === true) {
                  return done(null, 'sdsad')
                }
                else {
                  return done(null, false);
                }
              })
            }
      
      
          })
    }
))
module.exports=passport;