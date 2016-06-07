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
        }
    }
});

studentDate.sync({force: false});
module.exports = studentDate;
/*studentDate.sync({force: false}).then( function () {
 return studentDate.create({
 uniqID: 230406,
 name: "Козлов Пётр Вячеславович",
 date: "25.12.2015"
 });
 });
*/