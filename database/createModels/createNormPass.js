var Sequelize = require('sequelize');
var sequelize = require('./connect');

var normPass = sequelize.define('normPass', {
    uniqID: {
        type: Sequelize.INTEGER(11),
        field: 'uniqID', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    studentName: {
        type: Sequelize.STRING(120),
        field: 'studentName', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    normName: {
        type: Sequelize.INTEGER(11),
        field: 'normName', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE(),
        field: 'date', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    result: {
        type: Sequelize.STRING(20),
        field: 'result', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    mark: {
        type: Sequelize.INTEGER(6),
        field: 'mark', // Will result in an attribute that is firstName when user facing but first_name in the database
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
                uniqID: data.uniqID,
                studentName: data.studentName,
                normName: data.normName,
                date: data.date,
                result: data.result,
                mark: data.mark
            }).then(function (data) {
                if (data)callback(data.dataValues, null);
            }).catch(function (err) {
                if (err.message.indexOf("key constraint fails") != -1)
                    callback(null, "Не существует либо студента, либо норматива.");
                if (err.message.indexOf("Validation error") != -1)
                    callback(null, "Такая сдача норматива уже есть");
            })
        },
        deleteRow: function (row, callback) {
            this.findOne({uniqID: row.uniqID, definition: row.definition, date: row.date}).then(function (data) {
                if (!data) callback(null, "Такая запись уже удалена");
                else data.destroy().then(function (data) {
                    callback(data.dataValues, null);
                });
            })
        },
        updateRow: function (row, newRow, callback) {
            this.findOne({uniqID: row.uniqID, definition: row.definition, date: row.date}).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    result:  newRow.result,
                    mark:  newRow.mark
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        }
    }
});

normPass.sync({force: false});

module.exports = normPass;
/*
 var p = {uniqID: 230406,
 normName: "прыжки через костёр",
 date: "2016.06.25",
 result: 5.6,
 mark: 3};
 var l =  {uniqID: 230406,
 normName: "прыжки через костёр",
 date: "2016.06.25",
 result: 5.8,
 mark: 5};

 normPass.insertRow(l, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });

 normPass.updateRow(l, p, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });


 normPass.deleteRow(p , function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });*/


