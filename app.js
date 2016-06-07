
var express = require('express');

var app = express();

var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');

var config = require('./config');
var log = require('./libs/log')(module);
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var routes = require('./routes/index');


var SequelizeStore = require('connect-session-sequelize')(session.Store);
var Sequelize = require('sequelize');
var sequelize = require('./database/createModels/connect');
var ses = require('./database/createModels/createSession');
var us = require('./database/createModels/createUser');
var teacher = require('./database/createModels/createTeacher');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'pages')));

// view engine setup
// шаблончики подключение
//app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/pages');
//app.set('view engine', 'jade');




http.createServer(app).listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});
/*
app.use(session({
   // resave: config.get('session:resave'),
   // saveUninitialized: config.get('session:resave'),
    secret: config.get('session:secret'),
    name: config.get('session:name'),
    cookie: config.get('session:cookie'),
    store: new SequelizeStore({
        db: sequelize,
        engine: "mysql"
    }),
}));

app.use(function (req, res, next) {
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    res.send("Visits: " +  req.session.numberOfVisits);
});*/

app.get('/lol', function(req, res, next) {
   //res.render('index');
    teacher(function (data) {
       //if (err) throw err;
        res.send(data[0].name);
        });
    });


app.get('/', function(req, res, next) {
    //res.sendFile('Development/Projects/web/OPHPprotver/pages/index');
    res.sendFile(path.join(__dirname, './pages', 'index.html'));
});

app.get('/teachers', function(req, res, next) {
    //res.sendFile('Development/Projects/web/OPHPprotver/pages/index');
    teacher.getTable(function (data, err) {
        if (err)res.send(err);
        else res.send(data);
    })
   // res.sendFile(path.join(__dirname, './pages', 'teachers.html'));
});
app.get('/login', function (req, res, next) {
    res.render('login');
});

app.post('/login', require('./routes/login').post);


app.get('/registration', function (req, res, next) {
    res.render('/registration');
});

app.get('/user', function (req, res, next) {

    us.findUser('Василий', 'Lol', function (user, err) {
        if (err) res.send(err);
        else {
            res.send("Username: " + user.name + ", Password: "+ user.password);
        }
    })

});


app.use (function (err, req, res, next) {
    if (app.get('env') == 'development') {
        res.send(err.message);
    } else {
        res.status(500).send("Произошла ошибка")
    }
});

app.use (function (req, res) {
   res.status(404).send("Page not found, sorry");
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = app;
