var Sequelize = require('sequelize');
var sequelize = require('./connect');


var user = sequelize.define('user', {
    name: {
        type: Sequelize.STRING(90),
        field: 'name', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING(90),
        primaryKey: true
    }
},{
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    classMethods: {
        checkPassword: function(username, password, callback){
            this.findOne({where:{name: username, password: password}}).then(function (user) {
                if (user == null) callback(null, "USERNAME OR PASSWORD NOT MATCH");
                else callback(user, null);
            });
        }

    }
});

user.sync({force: false});


module.exports = user;
/*
user.checkPassword('Василий', 'Lol', function(user, err){
    if (err) console.log(err);
    else {
        console.log(user);
    }
})*/



