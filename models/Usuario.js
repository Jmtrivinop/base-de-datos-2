const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MariadbConnection');
const { Persona } = require('./Persona');  // Ensure correct path to Persona model

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
        }
    },
    rol: {
            type: DataTypes.ENUM('ADMIN_ROLE', 'USER_ROLE'),
            allowNull: false
     
     },
    estado: {
            type: DataTypes.BOOLEAN
            
        },
}, {
    freezeTableName: true,
    timestamps: false
});

User.belongsTo(Persona, { foreignKey: 'id_persona', as: 'Persona' });
Persona.hasMany(User, { foreignKey: 'id_persona', as: 'Usuarios' });

module.exports = { User };
