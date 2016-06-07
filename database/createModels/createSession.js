var Sequelize = require('sequelize');
var sequelize = require('./connect');

var sessions = sequelize.define('sessions', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    expires: {
        type: Sequelize.DATE(),
        allowNull: true
    },
    data: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE(),
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE(),
        allowNull: true
    },
    sess: Sequelize.JSON
}, {
    timestamps: false,
    freezeTableName: true // Model tableName will be the same as the model name
});

sessions.sync({force: false});
module.exports = sessions;
/*
 sessions.sync({force: false}).then( function () {
 return sessions.create({
 sessionsNumber: 2304,
 faculty: "ФКТИ",
 course: 2
 });
 });*/