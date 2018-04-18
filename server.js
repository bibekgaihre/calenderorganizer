//import required packages 
const express = require('express');
var session = require('express-session');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

const hbs = require('hbs');
const app=express();
const path = require('path');
const bodyParser = require('body-parser');

const passport = require('passport');
const flash = require('connect-flash');

var index=require('./routes/index');
var calender=require('./routes/calender');
var signup=require('./routes/signup');
//just use the static file holding directory name
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');



app.use(cookieParser());
//using session as global variable on app
app.use(session({
    secret: 'ilovuit',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
    // cookie: { secure: true }
}));


app.use(flash());
app.use(passport.initialize());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(function (req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});
  // mapping routes in express server
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());
  app.use('/',index);
  app.use('/calender',calender);
  app.use('/signup',signup);

app.listen(3000, () => {
    console.log('Server Connected on port 3000 ')
  });