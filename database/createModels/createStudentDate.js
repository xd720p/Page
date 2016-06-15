var Sequelize = require('sequelize');
var sequelize = require('./connect');
var async = require('async');
var moment = require('moment');

var studentDate = sequelize.define('studentDate', {
    uniqID: {
        type: Sequelize.INTEGER(11),
        field: 'uniqID', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(120),
        field: 'name', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    discipline: {
        type: Sequelize.STRING(50),
        field: 'discipline', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE(),
        field: 'date', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    visit: {
        type: Sequelize.STRING(50),
        field: 'visit', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    }

}, {
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name

    classMethods: {
        getTable: function (callback) {
            this.findAll().then(function (data) {
                var dataval = [];
                data.forEach(function (item, i, data) {
                    dataval.unshift(data[i].dataValues)
                });
                if (data == null) callback(null, "No Table");
                else callback(dataval, null);
            })
        },
        insertRow: function (data, callback) {
                var student = require('./createStudent');
                var mod = this;
                student.getDiscipline(data.uniqID, function (disc, err) {
                    if (err) callback(null, err);
                    else {
                        mod.create({
                            uniqID: data.uniqID,
                            name: data.name,
                            discipline: disc,
                            date: data.date,
                            visit: data.visit
                        }).then(function (data) {
                            if (data)callback(data.dataValues, null);
                        }).catch(function (err) {
                            if (err.message.indexOf("key constraint fails") != -1)
                                callback(null, "Нельзя добавить стулента несуществующей группы или с несуществующим преподавателем");
                            if (err.message.indexOf("Validation error") != -1)
                                callback(null, "Такой студент уже есть");
                        })

                    }
                })
        },
        deleteRow: function (row, callback) {
            this.findOne({uniqID: row.uniqID, name: row.name, date: row.date}).then(function (data) {
                if (!data) callback(null, "Такая запись уже удалена");
                else data.destroy().then(function (data) {
                    callback(data.dataValues, null);
                });
            })
        },
        updateRow: function (row, callback) {
            this.findOne({uniqID: row.uniqID, name: row.name, date: row.date}).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    visit: row.visit
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        },
        sendTable: function (discipline, faculty, course, firstDate, lastDate, callback) {
            var student = require('./createStudent');
            var dataval = [];
            this.findAll().then(function (data) {
                if (!data) {
                    callback(null, "Таблица пустая");
                } else {
                    var year = 2014 % 10;
                    if (moment().quarter() < 3) {
                        year = year - course;
                    } else {
                        year = year - course + 1;
                    }
                    year = year * 10 + faculty;

                    var temp = null;
                    var tempVal = new Object();
                    var first = null;
                    data.forEach(function(item, i, data) {
                        var source = ((item.uniqID-item.uniqID%10000)/10000);
                        if (year == source) {
                            if (item.discipline == discipline) {
                                if (temp) {
                                    if (temp == item.dataValues.name) {
                                        if (moment(item.dataValues.date).isSameOrAfter(firstDate) && moment(item.dataValues.date).isSameOrBefore(lastDate))
                                        tempVal[item.dataValues.date] = item.dataValues.visit;
                                    } else {
                                        if (tempVal["name"])
                                            dataval.push(tempVal);
                                        tempVal = new Object();
                                        temp = item.dataValues.name
                                        if (moment(item.dataValues.date).isSameOrAfter(firstDate) && moment(item.dataValues.date).isSameOrBefore(lastDate)) {
                                            tempVal["name"] = item.dataValues.name;
                                            tempVal[item.dataValues.date] = item.dataValues.visit;
                                        }

                                    }
                                }

                                if (!first) {
                                    if (moment(item.dataValues.date).isSameOrAfter(firstDate) && moment(item.dataValues.date).isSameOrBefore(lastDate)) {
                                        tempVal["name"] = item.dataValues.name;
                                        tempVal[item.dataValues.date] = item.dataValues.visit;
                                        first = true;
                                        temp = item.dataValues.name;
                                    }

                                }


                            }
                        }
                    })
                    callback(dataval, null);


                }

            })
        }
    }
});

studentDate.sync({force: false});
/*
var firstDate = new Date(2016, 04, 21);
var lastDate = new Date(2016, 05, 20);

studentDate.sendTable("Атлетическая подготовка", 3, 2, firstDate, lastDate, function (students, err) {
    if (err) console.log(err);
    else {
       console.log(students);
    }
})*/
/*
var p = { uniqID: 238265,
    name: "Бендер Бендер",
    date: "2016.06.15",
    visit: "был"}
studentDate.insertRow(p, function (row, err) {
    if (err) console.log(err);
    else console.log(row);
})*/
module.exports = studentDate;


