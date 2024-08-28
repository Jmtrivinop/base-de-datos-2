const {response, request} = require('express')
const { Op } = require('sequelize');
const { User } = require('../models/Usuario');
const { bdmysql } = require('../database/MariadbConnection');

const usuarioGet = async (req, res = response) => {


    const query = req.query;


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;




    //console.log("Datos",q,nombre);
    try {
        const unosUsuarios = await User.findAll();
        res.json({
            ok: true,
            msg: 
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: unosUsuarios
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })


    }


};
const obtenerPersona = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        // Encuentra el usuario por ID y carga la persona asociada
        const usuario = await User.findByPk(id, {
            include: {
                model: Persona,
                as: 'persona' // Debe coincidir con el alias definido en el modelo User
            }
        });

        // Si el usuario no existe, responde con un error 404
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }

        // Devuelve la persona asociada
        res.json({
            ok: true,
            data: usuario.persona // `persona` es el alias usado en el modelo
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};
module.exports = {
    usuarioGet, obtenerPersona
}