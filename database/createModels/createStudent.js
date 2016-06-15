var Sequelize = require('sequelize');
var sequelize = require('./connect');

var student = sequelize.define('student', {
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
    medAccess: {
        type: Sequelize.STRING(50),
        field: 'medAccess', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    groupNumber: {
        type: Sequelize.INTEGER(11),
        field: 'groupNumber', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    teacherName: {
        type: Sequelize.STRING(90),
        field: 'teacherName', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    discipline: {
        type: Sequelize.STRING(50),
        field: 'discipline', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
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
                if (data == null) callback(null, "В таблице нет данных");
                else callback(dataval, null);
            })
        },
        insertRow: function (data, callback) {
            var teacher = require('./createTeacher');
            var mod = this;
                    teacher.getDiscipline(data.teacherName, function (disc, err) {
                        if (err) callback(null, err);
                        else {
                            mod.create({
                                uniqID: data.uniqID,
                                name: data.name,
                                medAccess: data.medAccess,
                                groupNumber: data.groupNumber,
                                teacherName: data.teacherName,
                                discipline: disc
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
            this.findById(row.uniqID).then(function (data) {
                if (!data) callback(null, "Такая запись уже удалена");
                else data.destroy().then(function (data) {
                    callback(data.dataValues, null);
                });
            })
        },
        updateRow: function (row, callback) {
            this.findById(row.uniqID).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    name: row.name,
                    medAccess: row.medAccess,
                    groupNumber: row.groupNumber,
                    teacherName: row.teacherName
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        },
        getSource: function (uniqID, callback) {
            this.findById(uniqID).then(function (student) {
                    var group = require('./createGroup');
                    group.getGroup(student.groupNumber, function (group, err) {
                        var source = {faculty: group.faculty, course: group.course}
                        callback(source, null);
                    })
            }).catch(function (err) {
                callback(null, err);
            })
        },

        getDiscipline: function (uniqID, callback) {
            var teacher = require('./createTeacher');

            this.findById(uniqID).catch().then(function (student, err) {
                if (err) callback(null, err);
                else {
                    teacher.getDiscipline(student.teacherName, function (disc, err) {
                        if (err) callback(null, err);
                        else {
                            callback(disc, null);
                        }
                    })
                }
            })


        }

    }
});

student.sync({force: false});

module.exports = student;
/*
student.getDiscipline("2365", function (disc, err) {
    if (err) console.log(err);
    else console.log(disc);
})*/

/*
student.getSource("2365", function (source, err) {
    if (err) console.log(err);
    else console.log(source);
})*/
/*
 var l = {uniqID: 230506,
 name: "Иван",
 medAccess: "допущен",
 groupNumber: 2305,
 teacherName: "Василий"};
 var p = {uniqID: 230506,
 name: "Иванушка",
 medAccess: "Болеет",
 groupNumber: 2305,
 teacherName: "Иван"};

 student.insertRow(l, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });


 student.updateRow(l , p, function (callback,err) {
 if (err) console.log(err);
 else console.log(callback);
 });


 student.deleteRow(p, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });*/




