const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('waysbucks',
    'root',
    null, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,
    freezeTableName: true,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize;

module.exports = db;