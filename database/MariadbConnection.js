const {Sequelize} = require('sequelize')

const bdmysql = new Sequelize(
    'mydb',
    'root',
    '',
    {
        host: 'localhost',
        port: process.env.BD,
        dialect: 'mariadb'
    }

    
    );

module.exports = {
    bdmysql
}