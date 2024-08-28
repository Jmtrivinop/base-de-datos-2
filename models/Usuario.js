const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariadbConnection');
const { Persona } = require('../models/Persona');


const User = bdmysql.define('User', {
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    email: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    id_persona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Persona,
            key: 'id_persona' 
        },
    }
   
}, 
{
   
    freezeTableName: true,

  
    timestamps: false
});

module.exports = { User };