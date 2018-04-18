
//importing the hashing library for node js  to hash the password
var bcrypt = require('bcrypt');
const saltRounds = 10;



var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var databaseconnection = require('../../config/databaseconnection');

exports.signup=function(req,res,next){
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    // req.checkBody('confirmpassword', 'Passwords do not match, please try again.').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        res.render('signup.hbs', {
            notification: 'Registration Error',
            errors: errors
        });
        console.log('Error');
    }
    else{
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

    bcrypt.hash(password,saltRounds,function(err,hash){
        var usedatabase=`USE calender`;
        databaseconnection.query(usedatabase, (err, result) => {
            if (err) throw err;
        });
        databaseconnection.query("INSERT INTO `user` (`firstname`, `lastname`,  `username`, `password`, `email`) VALUES( '"+firstname+"','"+lastname+"','"+username+"','"+hash+"','"+email+"') ",function(err,result){
            if(err) throw err;
            else{
                res.render('signup.hbs',{
                    notification:'Registration Completed'
                })
                console.log('Registration Completed');
            }
        })
    })        
    }

}