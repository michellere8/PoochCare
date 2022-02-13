var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');
var aboutRouter = require('./routes/about');
var careRouter = require('./routes/care');
var activityRouter = require('./routes/activity');
var bookingRouter = require('./routes/booking');
var logoutRouter = require('./routes/logout');
var mssgRouter = require('./routes/mss');
var mongoRouter = require('./routes/mongo');

var nocache = require('nocache');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'madremia'}));

app.use(nocache());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/about', aboutRouter);
app.use('/care', careRouter);
app.use('/activity', activityRouter);
app.use('/booking', bookingRouter);
app.use('/logout', logoutRouter);
app.use('/mssg', mssgRouter);
app.use('/mongo', mongoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
