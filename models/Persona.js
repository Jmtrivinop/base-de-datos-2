const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariadbConnection');



const Persona = bdmysql.define('Persona', {
    id_persona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Tipo_documento: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    'Numero Documento': {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    freezeTableName: true,

    timestamps: false

    
},
);

module.exports = { Persona };