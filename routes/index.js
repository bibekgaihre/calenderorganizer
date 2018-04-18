var express=require('express');
var router=express.Router();
var bodyparser=require('body-parser');
var passport = require('../config/passport');

//importing express session middleware 
var session = require('express-session');

var indexController=require('../app/controller/indexController')
var loginController=require('../app/controller/loginController');
router.get('/',indexController.index);
router.get('/signup',indexController.signup);
router.get('/redirectindex', function (req, res, next) {
    req.session.destroy(function (err) {
      res.clearCookie();
      if (err) {
        res.negotiate(err);
      }
      res.render('index.hbs',{
        message:'Incorrect username or password'
      });
    });
  })
router.post('/loginuser',loginController.loginuser,
passport.authenticate('localuser',{
    successRedirect: ('/calender/calenderoverview'),
    failureRedirect: ('/redirectindex'),
    failureFlash: 'email or password not matched ',
})
)

router.get('/logout',function (req, res, next) {

  req.session.destroy(function (err) {
    res.clearCookie();
    if (err) {
      res.negotiate(err);
    }
    res.redirect('/');
  });
})
module.exports=router;