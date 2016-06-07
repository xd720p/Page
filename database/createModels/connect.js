var Sequelize = require('sequelize');
var connectionConf = require('./connectionConfig.json');

var sequelize = new Sequelize('ofp', 'root', 'FALLofreach117', {
    host: connectionConf.host,
    port: connectionConf.port,
    dialect: connectionConf.dialect,


    pool: {
        max: connectionConf.pool.max,
        min: connectionConf.pool.min,
        idle: connectionConf.pool.idle
    },
});

module.exports = sequelize;