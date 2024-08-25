const {Sequelize} = require('sequelize')

const bdmysql = new Sequelize(
    'mydb',
    'root',
    'Cl1v1st0n10.',
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mariadb'
    }

    
    );

module.exports = {
    bdmysql
}