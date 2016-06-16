UserController = function() {};
var Parser = require('node-dbf');
var file;
var student = require('../database/createModels/createStudent')
var async = require('async');
var calls = [];

UserController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware

    file = req.files.file;
    console.log(file.name);
    console.log(file.type);

    var parser = new Parser(file.name);

    parser.on('start', function(p) {
        console.log('dBase file parsing has started');
    });
    parser.on('header', function(h) {
        console.log('dBase file header has been parsed');
    });

    parser.on('record', function(record) {
        var temp = new Object();
        var name = record.NAME + ' ' + record.IM + ' ' + record.OT;
        var groupNumber = (record.STNUMB-record.STNUMB%100)/100;
        var uniqID = record.STNUMB;
       // item.uniqID-item.uniqID%10000)/10000)

        temp["uniqID"] = uniqID;
        temp["name"] = name;
        temp ["medAccess"] = "Нет";
        temp["groupNumber"] = groupNumber;
        temp["teacherName"] = "-";
       // temp["discipline"] = null;

        //console.log('Name: ' + name + ' LOl: ' + uniqID + ' lal: ' + groupNumber); // Name: John Smith
        student.insertRow(temp, function (callback, err) {
            if (err) console.log(err);
            else console.log(callback);
        });
        console.log(temp);
    });
    parser.parse();

}






module.exports = new UserController();