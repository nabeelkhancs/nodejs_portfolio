require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/db');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var indexRouter = require('./routes/web');
var usersRouter = require('./routes/web/users');
var viewHelpers = require('./helpers/view-functions');
const fileUpload = require('express-fileupload');


var app = express();

connectDB();

// Passport Config
require('./config/passport')(passport);

//helper functions
app.locals = { ...viewHelpers };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'pos_techoid',
    resave: true,
    saveUninitialized:true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // Error from Passport
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req,res) => {
//   res.render('index');
// });
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
