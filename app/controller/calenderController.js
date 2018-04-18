var bodyparser = require('body-parser');
var session = require('express-session');
//database validation
var databaseconnection = require('../../config/databaseconnection');

exports.dashboard = function (req, res, next) {
    var sessionuser = req.session.username;
    if (req.session.username) {
        var usedb = `USE calender`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        databaseconnection.query("SELECT * FROM user WHERE email='" + sessionuser + "' ", function (err, rows) {
            if (err) throw err;
            rows.forEach(function (results) {
                userid = results.userid,
                    username = results.username
            })
            res.render('dashboard.hbs', {
                sessionname: sessionuser,
                username:username
            });
        });
        

    }
    else {
        res.redirect('/');
        res.end();
    }
}

exports.calender = function (req, res, next) {
    var sessionuser = req.session.username;
    if (req.session.username) {
        var usedb = `USE calender`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        databaseconnection.query("SELECT * FROM user WHERE email='" + sessionuser + "' ", function (err, rows) {
            if (err) throw err;
            rows.forEach(function (results) {
                userid = results.userid,
                    username = results.username
            })
            res.render('eventcalender.hbs', {
                sessionname: sessionuser,
                username:username
            });
        });

    }
    else {
        res.redirect('/');
        res.end();
    }
}
exports.getevent = function (req, res, next) {
    var sessionuser = req.session.username;
    if (req.session.username) {
        var usedb = `USE calender`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        databaseconnection.query("SELECT * FROM user WHERE email='" + sessionuser + "' ", function (err, rows) {
            if (err) throw err;
            rows.forEach(function (results) {
                userid = results.userid,
                    username = results.username
            })
            var displayevent = "SELECT * FROM events WHERE userid='" + userid + "' ORDER BY eventid "
            databaseconnection.query(displayevent, function (err, rows, field) {
                if (err) throw err;
                for (var i = 0; i < rows.length; i++) {
                    var data = {
                        'title': rows[i].title,
                        'id': rows[i].eventid,
                        'start': rows[i].start_event,
                        'end': rows[i].end_event,
                        'allDay': false,


                    }

                    console.log(JSON.stringify(data));
                    res.end(JSON.stringify(data));
                }
            })
        });
    }
    else {
        res.redirect('/');
        res.end();
    }
}
exports.deleteevent = function (req, res, next) {
    var sessionuser = req.session.username;
    var eventid = req.params.eventid;
    if (req.session.username) {
        var usedb = `USE calender`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        databaseconnection.query("DELETE FROM `events` WHERE `events`.`eventid` ='" + eventid + "' ", function (err, result) {
            if (err) throw err;
            res.redirect('/calender/eventcalender');
        })

    }
    else {
        res.redirect('/');
        res.end();
    }
}
exports.updateevent = function (req, res, next) {
    var sessionuser = req.session.username;
    var title = req.body.title;
    var start = req.body.start;
    var end = req.body.end;
    var id = req.body.id;
    if (req.session.username) {
        var usedb = `USE calender`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        var updateevent = "UPDATE `events` SET `title` = '" + title + "', `start_event` = '" + start + "', `end_event` = '" + end + "' WHERE `events`.`eventid` ='" + id + "'  "
        databaseconnection.query(updateevent, function (err, result) {
            if (err) throw err;
            res.redirect('/calender/eventcalender');
        })
    }
    else {
        res.redirect('/');
        res.end();
    }
}
exports.postevent = function (req, res, next) {
    var sessionuser = req.session.username;
    var title = req.body.title;
    var start = req.body.start;
    var end = req.body.end;
    console.log(title);
    if (req.session.username) {
        var usedb = `USE calender`;
        databaseconnection.query(usedb, (err, result) => {
            if (err) throw err;
        });
        databaseconnection.query("SELECT * FROM user WHERE email='" + sessionuser + "' ", function (err, rows) {
            if (err) throw err;
            rows.forEach(function (results) {
                userid = results.userid,
                    username = results.username
            })
            databaseconnection.query("INSERT INTO `events` (`title`, `start_event`, `userid`, `end_event`) VALUES ('" + title + "', '" + start + "', '" + userid + "', '" + end + "')", function (err, result) {
                if (err) throw err;
                console.log("Event inserted");
                res.redirect('/calender/eventcalender');
            })
        })


    }
    else {
        res.redirect('/');
        res.end();
    }
}