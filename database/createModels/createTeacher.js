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
        allowNull: false
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
                if (data == null) callback(null, "USERNAME OR PASSWORD NOT MATCH");
                else callback(dataval, null);
            })
        }
    }
});

teacher.sync({force: false});

/*teacher.getTable(function (data, err) {
    if (err) console.log(err);
    else console.log(data);
})
*/
/*teacher.sync({force: false}).then(function () {
    return teacher.create({
        name: "Фомичева Татьяна Генриховна",
        post: "Старший преподаватель",
        qualification: "Доцент",
        authority: 1,
        discipline: "Волейбол"
    });
});*/

module.exports = teacher;