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
        }
    }
});
/*
student.getTable(function (data, err) {
 if (err) console.log(err);
 else console.log(data);
 })*/


/*student.sync({force: false}).then( function () {
    return student.create({
        uniqID: 230406,
        name: "Козлов Пётр Вячеславович",
        medAccess: 'болеет',
        groupNumber: 2304,
       teacherName: "Василий"
    });
});*/

student.sync({force: false});

module.exports = student;