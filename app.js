
var express = require('express');

var app = express();

var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');

var config = require('./config');
var log = require('./libs/log')(module);
//var favicon = require('serve-favicon');
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
var discipline = require('./database/createModels/createDiscipline');
var group = require('./database/createModels/createGroup');
var norm = require('./database/createModels/createNorm');
var normPass = require('./database/createModels/createNormPass');
var student = require('./database/createModels/createStudent');
var studentDate = require('./database/createModels/createStudentDate');

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



app.get('/', function(req, res, next) {
    //res.sendFile('Development/Projects/web/OPHPprotver/pages/index');
    res.sendFile(path.join(__dirname, './pages', 'index.html'));
});

//allForTeachers
app.get('/teachers', function(req, res, next) {
    teacher.getTable(function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
app.post('/teachers/add', function(req, res, next) {
    teacher.insertRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/teachers/remove', function(req, res, next) {
    teacher.deleteRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.put('/teachers/update', function(req, res, next) {
    teacher.updateRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
//allForTeachers


//allForDisciplines
app.get('/discipline', function(req, res, next) {
    discipline.getTable(function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
app.post('/discipline/add', function(req, res, next) {
    discipline.insertRow(req.body, function (data, err) {
        if (err)res.send(err);
        else res.send(data);
    })
});

app.post('/discipline/remove', function(req, res, next) {
    discipline.deleteRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.put('/discipline/update', function(req, res, next) {
    discipline.updateRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
//allForDisciplines

//allForGroup
app.get('/group', function(req, res, next) {
    group.getTable(function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/group/add', function(req, res, next) {
    group.insertRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/group/remove', function(req, res, next) {
    group.deleteRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.put('/group/update', function(req, res, next) {
    group.updateRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
//allForGorup

//allForNorm
app.get('/norm', function(req, res, next) {
    norm.getTable(function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/norm/add', function(req, res, next) {
    norm.insertRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/norm/remove', function(req, res, next) {
    norm.deleteRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.put('/norm/update', function(req, res, next) {
    norm.updateRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

//allForNorm

//allForNormPass
app.get('/normpass', function(req, res, next) {
    //res.sendFile('Development/Projects/web/OPHPprotver/pages/index');
    normPass.getTable(function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
    // res.sendFile(path.join(__dirname, './pages', 'teachers.html'));
});

app.post('/normpass/add', function(req, res, next) {
    normPass.insertRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/normpass/remove', function(req, res, next) {
    normPass.deleteRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.put('/normpass/update', function(req, res, next) {
    normPass.updateRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
//allForNormPass

//allForStudents
app.get('/students', function(req, res, next) {
    //res.sendFile('Development/Projects/web/OPHPprotver/pages/index');
    student.getTable(function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
    // res.sendFile(path.join(__dirname, './pages', 'teachers.html'));
});

app.post('/students/add', function(req, res, next) {
    student.insertRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/students/remove', function(req, res, next) {
    student.deleteRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.put('/students/update', function(req, res, next) {
    student.updateRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
//allForStudents

//allForStudentDate
app.get('/studentdate', function(req, res, next) {
    //res.sendFile('Development/Projects/web/OPHPprotver/pages/index');
    studentDate.getTable(function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
    // res.sendFile(path.join(__dirname, './pages', 'teachers.html'));
});


app.post('/studentdate/add', function(req, res, next) {
    studentDate.insertRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.post('/studentdate/remove', function(req, res, next) {
    studentDate.deleteRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});

app.put('/studentdate/update', function(req, res, next) {
    studentDate.updateRow(req.body, function (data, err) {
        if (err) res.status(500).send(err);
        else res.send(data);
    })
});
//allForStudentDate


app.get('/login', function (req, res, next) {
    res.render('login');
});

app.post('/login', require('./routes/login').post);


app.get('/registration', function (req, res, next) {
    res.render('/registration');
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
