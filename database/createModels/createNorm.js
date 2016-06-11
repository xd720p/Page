var Sequelize = require('sequelize');
var sequelize = require('./connect');

var norm = sequelize.define('norm', {
    name: {
        type: Sequelize.STRING(90),
        field: 'name', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    definition: {
        type: Sequelize.STRING(500),
        field: 'definition', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    point1: {
        type: Sequelize.STRING(90),
        field: 'point1', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    point2: {
        type: Sequelize.STRING(90),
        field: 'point2', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    point3: {
        type: Sequelize.STRING(90),
        field: 'point3', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    count: {
        type: Sequelize.STRING(90),
        field: 'count', // Will result in an attribute that is firstName when user facing but first_name in the database
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
                name: data.name,
                definition: data.definition,
                point1: data.point1,
                point2: data.point2,
                point3: data.point3,
                count: data.count
            }).then(function (data) {
                if (data)callback(data.dataValues, null);
            }).catch(function (err) {
                if (err.message.indexOf("Validation error") != -1)
                    callback(null, "Такой норматив уже есть");
            })
        },
        deleteRow: function (row, callback) {
            this.findById(row.name).then(function (data) {
                if (!data) callback(null, "Такая запись уже удалена");
                else data.destroy().then(function (data) {
                    callback(data.dataValues, null);
                });
            })
        },
        updateRow: function (row, newRow, callback) {
            this.findById(row.name).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    definition: newRow.definition,
                    point1: newRow.point1,
                    point2: newRow.point2,
                    point3: newRow.point3,
                    count: newRow.count
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        }
    }
});

norm.sync({force: false});
module.exports = norm;
/*
 var p = {name: "Бег",
 definition: "lorem",
 point1: 5.6,
 point2: 6.5,
 point3: 7.5,
 count: false};
 var l =  {name: "Бег",
 definition: "lorem",
 point1: 55,
 point2: 65,
 point3: 75,
 count: true};

 norm.insertRow(l, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });

 norm.updateRow(l, p, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });
 */
/*
 norm.deleteRow(p , function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });*/

