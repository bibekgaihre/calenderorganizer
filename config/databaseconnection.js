const mysql=require('mysql');

//create coonection
const db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'',
    dateStrings:true,
    multipleStatement:true
});

//connect
db.connect((err)=>{
    if(err){
        throw err;

    }
    console.log('Database connected');
});
module.exports=db;