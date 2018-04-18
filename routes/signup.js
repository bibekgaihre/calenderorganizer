var express=require('express');
var router=express.Router();


//importing controller functions
var signupController = require('../app/controller/signupController')

router.post('/usersignup',signupController.signup);

module.exports=router;
