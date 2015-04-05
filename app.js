var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var Respoke = require('respoke-admin');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// respoke setup
var appId = "7caf8bfa-47a2-4113-a899-1a4098174557";
var appSecret = "0fa05cfa-aa2b-4dbf-9e87-d3b9242cdcf0";

var respoke = new Respoke({
    appId: appId,
    'App-Secret': appSecret
});

// connect to respoke
// provide an `endpointId` for receiving messages
respoke.auth.connect({ endpointId: "admin"});
respoke.on('connect', function () {
    console.log('admin is connected to respoke');
});

// Attaching respoke to request
app.use(function (req, res, next) {
    req.respoke = respoke;
    req.appId = appId;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
