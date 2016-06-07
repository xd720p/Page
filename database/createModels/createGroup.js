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
                if (data == null) callback(null, "USERNAME OR PASSWORD NOT MATCH");
                else callback(dataval, null);
            })
        }
    }
});

group.sync({force: false});

module.exports = group;
/*
group.sync({force: false}).then( function () {
    return group.create({
        groupNumber: 2304,
        faculty: "ФКТИ",
        course: 2
    });
});*/