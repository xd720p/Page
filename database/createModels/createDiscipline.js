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
                if (data == null) callback(null, "USERNAME OR PASSWORD NOT MATCH");
                else callback(dataval, null);
            })
        }
    }
});

module.exports = discipline;

discipline.sync({force: false});