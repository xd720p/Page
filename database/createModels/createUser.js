var Sequelize = require('sequelize');
var sequelize = require('./connect');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.json')

var user = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING(90),
        field: 'userName', // Will result in an attribute that is firstName when user facing but first_name in the database
        primaryKey: true
    },
    FIO: {
        type: Sequelize.STRING(90),
        field: 'FIO', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    discipline: {
        type: Sequelize.STRING(50),
        field: 'disciplineName', // Will result in an attribute that is firstName when user facing but first_name in the database
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING()

    },
    salt: {
        type: Sequelize.STRING()

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
        createUser: function (user, FIO, password, callback) {

           this.salt = crypto.randomBytes(16).toString('hex');
           this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

            var teacher = require('./createTeacher');
            var disciplineName = null;
            var userModel = this;
             teacher.getDiscipline(FIO, function (disc, err) {
                if (err) callback(null, "Error");
                else {
                    userModel.create({
                        userName: user,
                        discipline: disc,
                        FIO: FIO,
                        salt: userModel.salt,
                        hash: userModel.hash
                    }).then(function (data) {
                        // this.generateJWT(user);
                        callback(data.dataValues, null);
                    }).catch(function (err) {
                        callback(null, err);
                    })
                }
                 
            });


        },
        checkPassword: function (user, password, callback) {
            this.findById(user).then(function (data) {
                if (!data) callback(null, "Пользователь не найден");
                else {
                    var hash = crypto.pbkdf2Sync(password, data.salt, 1000, 64).toString('hex');
                    if (data.hash == hash) {
                        callback(data.dataValues, null);
                    } else callback(null, 'wrong password')
                   // callback(data.hash == hash, null);
                }
            })
        }
    }
});

user.sync({force: false});
/*
user.createUser("doode dodes", "Иванов Иван Иванович","passwords", function (callback, err) {
    if (err) console.log(err);
    else console.log(callback);
});*/
/*
user.checkPassword("DooDe Dodes", "passwords", function (callback, err) {
    if (err) console.log(err);
    else console.log(callback);
});
*/

module.exports = user;




