var express=require('express');
var router=express.Router();
var bodyparser=require('body-parser');

var calenderController=require('../app/controller/calenderController');

router.get('/calenderoverview',calenderController.dashboard);
router.get('/eventcalender',calenderController.calender);
router.get('/eventcalender/getevent',calenderController.getevent);
router.post('/eventcalender/postevent',calenderController.postevent);
router.get('/eventcalender/deleteevent/:eventid',calenderController.deleteevent);
router.post('/calender/eventcalender/updateevent',calenderController.updateevent);
module.exports=router;