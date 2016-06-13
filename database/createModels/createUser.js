var Sequelize = require('sequelize');
var sequelize = require('./connect');
var crypto = require('crypto');

var user = sequelize.define('user', {
    name: {
        type: Sequelize.STRING(90),
        field: 'name', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true
    },
    hash: {
        type: Sequelize.STRING(90)

    },
    salt: {
        type: Sequelize.STRING(90)

    }
},{
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    classMethods: {
        /*checkPassword: function(username, password, callback){
            this.findOne({where:{name: username, password: password}}).then(function (user) {
                if (user == null) callback(null, "USERNAME OR PASSWORD NOT MATCH");
                else callback(user, null);
            });
        }*/
        
        setPassword: function (password) {
            this.salt = crypto.randomBytes(16).toString('hex');

            this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
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



