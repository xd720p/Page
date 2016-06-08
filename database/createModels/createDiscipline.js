var Sequelize = require('sequelize');
var sequelize = require('./connect');


var discipline = sequelize.define('discipline', {
    shortName: {
        type: Sequelize.STRING(50),
        field: 'short_name', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: Sequelize.STRING(150),
        field: 'full_name',
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
                shortName: data.shortName,
                fullName: data.fullName
            }).then(function (data) {
                if (data)callback(data.dataValues, null);
            }).catch(function (err) {
                if (err.message.indexOf("Validation error") != -1)
                    callback(null, "Такая дисциплина уже есть");
            })
        },
        deleteRow: function (row, callback) {
            this.findById(row.shortName).then(function (data) {
                if (!data) callback(null, "Такая запись уже удалена");
                else data.destroy().then(function (data) {
                    callback(data.dataValues, null);
                });
            })
        },
        updateRow: function (row, newRow, callback) {
            this.findById(row.shortName).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    fullName: newRow.fullName
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        }
    }
});

module.exports = discipline;
/*
 var l = {shortName: "ОФПo", fullName: "общая физическая подготовка"};
 var p = {shortName: "ОФПo", fullName: "отдай фраппе Петру"};

 discipline.deleteRow(l , function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });

 discipline.insertRow(l, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });
 discipline.updateRow(l, p, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });*/

discipline.sync({force: false});