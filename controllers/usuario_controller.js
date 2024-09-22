const {response, request} = require('express')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar_jwt');
const { Op } = require('sequelize');
const { User } = require('../models/Usuario');
const { Persona } = require('../models/Persona');
const { bdmysql } = require('../database/MariadbConnection');


const usuarioGet = async (req, res = response) => {


    const query = req.query;


   
    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;

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

const usuarioByIdGet = async( req = request, res = response) => {
    const {id} = req.params;

    try {
        const unUsuairo = await User.findByPk(id);
        if (!unUsuairo) {
            return res.status(404).json({ok:false,
                msg: 'No existe un usuario con el id: ' + id
            })
        }


        res.json({
            ok:true,
            data:unUsuairo});

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
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
	const {email, password, id_persona, rol, estado} = req.body;
    const salt = 10
        
    const cleanedText = password.trim();   
    const new_password = await bcryptjs.hash(cleanedText, salt);
   
    console.log(new_password)

	try {

        const newUsuario = await User.create({
            email: email,
            password: new_password, 
            id_persona:id_persona,
            rol: rol,
            estado:estado
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
    const { password, email, id_persona, rol, estado } = req.body; 

    try {
        const usuario = await User.findByPk(id);

       
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }

        if (password) {
            const salt = 10;
            const new_password = await bcryptjs.hash(password, salt);
            usuario.password = new_password;
        }


        if (email) {
            usuario.email = email;
        }
        if (id_persona) {
            usuario.id_persona = id_persona;
        }
        if (rol) {
            usuario.rol = rol;
        }
        if (estado !== undefined) { 
            usuario.estado = estado;
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

const comprobarContraseña = async (req, res = response) => {
    const { email,password } = req.body;
     
    try {
        const exist_user = await User.findOne({ where: { email: email } });
        
        if (!exist_user){
            return res.status(404).json({
                ok: false,
                msg: `No existe una persona con el email: ${email}`
            });
        }
        else{
            console.log(exist_user.password)
            const salt = 10
        
      
   
            const isMatch = await bcryptjs.compare(password, exist_user.password);
            
            if (isMatch){
                console.log(exist_user.id_usuario)
                const token = await generarJWT(exist_user.id_usuario);
                console.log(token)
                res.json({
                    ok: true,
                    msg: "La contraseña coincide con la de la base de datos",
                    token
                });
            }
            else{
                return res.status(400).json({
                    ok: false,
                    msg: `Las contraseñas no coinciden`

        
                });
            }
        }
        
        
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
}


module.exports = {
    usuarioGet, obtenerPersona, usuarioPost, usuarioDelete, updateUsuario, comprobarContraseña, usuarioByIdGet}