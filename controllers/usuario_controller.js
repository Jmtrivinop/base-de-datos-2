const {response, request} = require('express')
const bcryptjs = require('bcryptjs');

const { Op } = require('sequelize');
const { User } = require('../models/Usuario');
const { Persona } = require('../models/Persona');
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
        
        const usuario = await User.findByPk(id, {
            include: {
                model: Persona,
                as: 'Persona' 
            }
        });

        console.log('Usuario:', usuario);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id: ${id}`
            });
        }

      
        res.json({
            ok: true,
            data: usuario.Persona 
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

const usuarioPost = async (req, res = response) => {
    console.log(bcryptjs);
	const {email, password, id_persona} = req.body;
    const salt = bcryptjs.genSaltSync();
    const new_password =  bcryptjs.hashSync(password, salt);

    

	try {

        const newUsuario = await User.create({
            email,
            password: new_password, 
            id_persona
        });




    	res.json({ok:true,
        	data:newUsuario
    	});

	} catch (error) {
    	console.log(error);
    	res.status(500).json({ok:false,
        	msg: 'Hable con el Administrador',
        	err: error
    	})

	}

};

const usuarioDelete = async (req, res = response) => {
	const { id } = req.params;


	console.log(id);
 
	

	try {

    	const usuario = await User.findByPk(id);
  

    	if (!usuario) {
        	return res.status(404).json({ok:false,
            	msg: 'No existe una persona con el id: ' + id
        	})
    	}

    

  
    	await usuario.destroy();

    	res.json({ok:true,
        	persona:usuario,
        	
    	});
    

	} catch (error) {
    	console.log(error);
    	res.status(500).json({ok:false,
        	msg: 'Hable con el Administrador',
        	err: error
    	})

	}

};

const updateUsuario = async (req, res = response) => {
    const { id } = req.params; 
    const { password } = req.body; 

    try {
        const salt = bcryptjs.genSaltSync();
        const new_password =  bcryptjs.hashSync(password, salt);
        const usuario = await User.findByPk(id);

      
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }

        if (password) {
            usuario.password = new_password;
        }

       
        await usuario.save();

      
        res.json({
            ok: true,
            data: usuario
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
    usuarioGet, obtenerPersona, usuarioPost, usuarioDelete, updateUsuario
}