var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');

var indexRouter = require('./routes/index');
var issuerRouter = require('./routes/users');
const passport = require('passport');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "heyhey"
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(issuerRouter.serializeUser());
passport.deserializeUser(issuerRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/issuer', issuerRouter);

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

// app.listen(3000);

module.exports = app;
