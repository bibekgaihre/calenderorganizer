var databaseconnection = require('./databaseconnection');

function createdba() {
    var createdatabase = `CREATE DATABASE IF NOT EXISTS calender`;
    databaseconnection.query(createdatabase, (err, result) => {
        if (err) throw err;
        var usedatabase = `USE calender`;
        databaseconnection.query(usedatabase, (err, result) => {
            if (err) throw err;
             var createusertable=`CREATE TABLE IF NOT EXISTS user(userid int AUTO_INCREMENT, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password binary(60) NOT NULL, PRIMARY KEY (userid), UNIQUE KEY(username,email))`;
            databaseconnection.query(createusertable,(err,result)=>{
                if(err) throw err;
            })
            var createeventtable=`CREATE TABLE IF NOT EXISTS events (
                eventid int(11) AUTO_INCREMENT,
                title varchar(255) NOT NULL,
                start_event datetime NOT NULL,
    			userid int,
                end_event datetime NOT NULL,PRIMARY KEY(eventid),
                FOREIGN KEY (userid) REFERENCES user(userid)
              )`;
              databaseconnection.query(createeventtable,(err,result)=>{
                  if(err) throw err;
              })
        })
    })
}
module.exports.createdba = createdba