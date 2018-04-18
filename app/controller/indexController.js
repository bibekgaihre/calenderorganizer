const data=require('../../config/db');

exports.index=function (req,res,next) {
    data.createdba();
    if(req.session.username){
        res.redirect('/calender/calenderoverview');
    }
    else{
        res.render('index.hbs',{
        
        });
    }
    
}
exports.signup=function(req,res,next){
    if(req.session.username){
        res.redirect('/calender/calenderoverview');
    }
    else{
        res.render('signup.hbs');
    }
    
}