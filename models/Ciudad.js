const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariadbConnection');

const Ciudad = bdmysql.define('Ciudad', {
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = { Ciudad };
