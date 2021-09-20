require('dotenv').config();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./config/db');
const methodOverride = require('method-override');
const cors = require('cors');
const fileUpload = require('express-fileupload');
var viewHelpers = require('./helpers/view-functions');

// Initialize App
const app = express();

// Connect Database
connectDB();
// helper functions
app.locals = { ...viewHelpers };

// Passport Config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Log Routes
app.use(logger('dev'));

// Accept Json in Request
app.use(express.json({ extended: true, limit: '200mb' }));
app.use(express.urlencoded({ extended: false, limit: '200mb' }));

// Express Session
app.use(
  session({
    secret: 'nabeel123',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Enable Cors
app.use(cors());

// Other MiddleWares
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(fileUpload());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // Error from Passport
  res.locals.user = req.user;
  next();
});

// Routes Configuration
// app.get('/', (req, res) => res.status(200).send('Server Running'));
app.use('/', require('./routes/admin'));
// app.use('/api/v1', require('./routes/api'));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('Page Not Found');
// });

module.exports = app;
