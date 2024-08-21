const {response, request} = require('express')
const { Op } = require('sequelize');
const { Persona } = require('../models/Persona');
const { bdmysql } = require('../database/MariadbConnection')

const personasGet = async (req, res = response) => {


    const query = req.query;


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;




    //console.log("Datos",q,nombre);
    try {
        const unasPersonas = await Persona.findAll();
        res.json({
            ok: true,
            msg: 'get API - Controller Funciono',
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: unasPersonas
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })


    }


}


const personaByIdGet = async( req = request, res = response) => {
    const {id} = req.params;

    try {
        const unaPersona = await Persona.findByPk(id);
        if (!unaPersona) {
            return res.status(404).json({ok:false,
                msg: 'No existe una Persona con el id: ' + id
            })
        }


        res.json({
            ok:true,
            data:unaPersona});

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}

const personasComoGet = async(req = request, res = response) => {


    const { termino } = req.params;


    try {
        const [results] = await bdmysql.query(
            "SELECT *" +
            " FROM persona" +
            " WHERE nombre LIKE '%" + termino + "%'" +
            " OR apellido LIKE '%" + termino + "%'" +
            " ORDER BY nombre"
        );


        res.json({ok:true,
            data: results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
}
module.exports = {
    personasGet, personaByIdGet, personasComoGet
}
