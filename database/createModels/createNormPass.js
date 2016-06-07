var Sequelize = require('sequelize');
var sequelize = require('./connect');

var normPass = sequelize.define('normPass', {
    uniqID: {
        type: Sequelize.INTEGER(11),
        field: 'uniqID', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    normName: {
        type: Sequelize.INTEGER(11),
        field: 'normName', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY(),
        field: 'date', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    mark: {
        type: Sequelize.INTEGER(6),
        field: 'mark', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true // Model tableName will be the same as the model name
});

normPass.sync({force: false});

normPass.sync({force: false}).then( function () {
 return normPass.create({
 uniqID: 230406,
 normName: "прыжки через костёр",
 date: "25.12.2015",
     mark: 5
 });
 });

