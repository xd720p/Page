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
    freezeTableName: true // Model tableName will be the same as the model name
});


discipline.sync({force: false});