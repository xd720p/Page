var Sequelize = require('sequelize');
var sequelize = require('./connect');

var teacher = sequelize.define('teacher', {
    name: {
        type: Sequelize.STRING(90),
        field: 'name', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    post: {
        type: Sequelize.STRING(90),
        field: 'post',
        allowNull: false
    },
    qualification: {
        type: Sequelize.STRING(90),
        field: 'qualification',
        allowNull: true
    },
    authority: {
        type: Sequelize.BOOLEAN,
        field: 'authority',
        allowNull: false
    },
    discipline: {
        type: Sequelize.BOOLEAN,
        field: 'discipline_short_name',
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
                if (data == null) callback(null, "Таблица пустая");
                else callback(dataval, null);
            })
        },
        insertRow: function (data, callback) {
            this.create({
                name: data.name,
                post: data.post,
                qualification: data.qualification,
                authority: data.authority,
                discipline: data.discipline
            }).then(function (data) {
                if (data)callback(data.dataValues, null);
            }).catch(function (err) {
                if (err.message.indexOf("key constraint fails") != -1)
                    callback(null, "Нельзя добавить преподавателя с несуществующей дисциплиной");
                if (err.message.indexOf("Validation error") != -1)
                    callback(null, "Такой преподаватель уже есть");
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
        updateRow: function (row, callback) {
            this.findById(row.name).then(function (data) {
                if (!data) callback(null, "Нет такой записи");
                else data.update({
                    post: row.post,
                    qualification: row.qualification,
                    authority: row.authority,
                    discipline: row.discipline
                }).then( function (data) {
                    if (data) callback(data.dataValues, null);
                    else callback(null, "Ошибочка");
                })
            })
        }
    }
});

teacher.sync({force: false});
module.exports = teacher;


/*
 var l = {name: "Васиbcf",
 post:"Старший преподаватель",
 qualification: "Доцент",
 authority: true,
 discipline:"Баскетбол"};
 var newRow = {
 name:"Tdhtq",
 post:"Старш преподаватель",
 qualification: "Доцент",
 authority: true,
 discipline:"Баскетбол"};

 teacher.updateRow(l , newRow, function (callback,err) {
 if (err) console.log(err);
 else console.log(callback);
 });

 teacher.deleteRow(l, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });

 teacher.insertRow(l, function (callback, err) {
 if (err) console.log(err);
 else console.log(callback);
 });

 teacher.getTable(function (data, err) {
 if (err) console.log(err);
 else console.log(data);
 })

 /*teacher.sync({force: false}).then(function () {
 return teacher.create({
 name: "Фомичева Татьяна Генриховна",
 post: "Старший преподаватель",
 qualification: "Доцент",
 authority: 1,
 discipline: "Волейбол"
 });
 });*/
