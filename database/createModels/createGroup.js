var Sequelize = require('sequelize');
var sequelize = require('./connect');

var group = sequelize.define('group', {
    groupNumber: {
        type: Sequelize.INTEGER(11),
        field: 'group_number', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    faculty: {
        type: Sequelize.STRING(90),
        field: 'faculty',
        allowNull: false
    },
    course: {
        type: Sequelize.INTEGER(6),
        field: 'course',
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
                if (data == null) callback(null, "Таблица пустая");
                else callback(dataval, null);
            })
        },
        insertRow: function (data, callback) {
            this.create({
                groupNumber: data.groupNumber,
                faculty: data.faculty,
                course: data.course
            }).then(function (data) {
                if (data)callback(data.dataValues, null);
            }).catch(function (err) {
                if (err.message.indexOf("Validation error") != -1)
                    callback(null, "Такая группа уже есть");
            })
        },
        deleteRow: function (row, callback) {
            this.findById(row.groupNumber).then(function (data) {
                if (!data) callback(null, "Такая запись уже удалена");
                else data.destroy().then(function (data) {
                    callback(data.dataValues, null);
                });
            })
        },
        updateRow: function (row, newRow, callback) {
            this.findById(row.groupNumber).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    faculty: newRow.faculty,
                    course: newRow.course
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        }

    }
});

group.sync({force: false});

/*
 var p = {groupNumber: "2376",
 faculty: "ФЭЛ",
 course: "2"};
 var l = {groupNumber: "2376",
 faculty: "ФЭМ",
 course: "1"};

 group.insertRow(l, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });

 group.updateRow(l, p, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });


 group.deleteRow(p , function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });*/



module.exports = group;
