var Sequelize = require('sequelize');
var sequelize = require('./connect');
var async = require('async');

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
            this.create({
                uniqID: data.uniqID,
                name: data.name,
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
        sendStudentTable: function (discipline, faculty, course, firstDate, lastDate, callback) {
            this.findAll().then(function (data) {
                if (!data) callback(null, "Таблица пустая");
                else {
                    var dataval = [];
                    data.forEach(function (item, i, data) {
                        var student = require('./createStudent');
                        student.getDiscipline(data[i].dataValues.uniqID, function (disc, err) {
                            if (err) callback(null, "ошибка в поиске дисциплины");
                            else {
                                if (discipline == disc) {
                                    student.getSource(data[i].dataValues.uniqID, function (source, err) {
                                        if (source.faculty == faculty && source.course == course) {
                                            dataval.unshift(data[i].dataValues.name);
                                            callback(dataval, null);
                                        }
                                    })
                                }
                            }
                        })
                       // dataval.unshift(data[i].dataValues)
                    });
               // callback(dataval, null);
                }
            })
        }
    }
});

studentDate.sync({force: false});

/*studentDate.sendStudentTable("Атлетическая подготовка", "ФКТИ", 2, null, null, function (students, err) {
    if (err) console.log(err);
    else console.log(students);
})*/
module.exports = studentDate;

