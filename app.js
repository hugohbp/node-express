var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var contatosRouter = require('./routes/contatos');

var bodyParser = require('body-parser')
var express = require('express')
var methodOverride = require('method-override')


var routers = require('./routes');

var app = express();

var session = require('express-session');

var socket_io = require('socket.io');

//socket.io
var io = socket_io();
app.io = io;
var indexRouter = require('./routes/index')(io);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId',
  resave: true,
  saveUninitialized: true
}));

//var consign = require('consign');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.use(logger('dev'));
app.use(cookieParser('ntalk'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/entrar', homeRouter);
app.use('/contatos', contatosRouter);
//app.use(bodyParser.urlencoded());

// override with different headers; last one takes precedence

// app.use(methodOverride('X-HTTP-Method')) // Microsoft
// app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
// app.use(methodOverride('X-Method-Override')) // IBM


// app.use(methodOverride((req, res) => {

//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     console.log('BODY', req.body);

//     var method = req.body._method;
//     delete req.body._method
//     console.log(method);
//     return method
//   }

// }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;