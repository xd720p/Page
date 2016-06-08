var Sequelize = require('sequelize');
var sequelize = require('./connect');

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
        type: Sequelize.DATEONLY(),
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
                if (data == null) callback(null, "USERNAME OR PASSWORD NOT MATCH");
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
        updateRow: function (row, newRow, callback) {
            this.findOne({uniqID: row.uniqID, name: row.name, date: row.date}).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    visit: newRow.visit
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        }
    }
});

studentDate.sync({force: false});
module.exports = studentDate;

