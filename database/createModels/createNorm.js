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
        type: Sequelize.FLOAT,
        field: 'point1', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    point2: {
        type: Sequelize.FLOAT,
        field: 'point2', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    point3: {
        type: Sequelize.FLOAT,
        field: 'point3', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: true
    },
    count: {
        type: Sequelize.BOOLEAN,
        field: 'count', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true // Model tableName will be the same as the model name
});

norm.sync({force: false});


/*
 norm.sync({force: false}).then( function () {
 return norm.create({
 name: 'прыжки через костёр',
 definition: "Прыгай или сгори",
 point1: 2,
     point2: 3,
     point3: 5,
     count: true
 });
});

norm.destroy({
   where: {
       name: 'прыжки через костёр'
   }
});
*/
