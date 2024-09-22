const {response, request} = require('express')
const { Op } = require('sequelize');
const { Ciudad } = require('../models/Ciudad');
const { bdmysql } = require('../database/MariadbConnection')

const ciudadesGet = async (req, res = response) => {


    const query = req.query;



    const { q, nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;





    try {
        const unasCiudades = await Ciudad.findAll();
        res.json({
            ok: true,
            msg: 'get API - Controller Funciono',
            query,
            q,
            nombre,
            apikey,
            page,
            limit,
            data: unasCiudades
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


const ciudadByIdGet = async( req = request, res = response) => {
    const {id} = req.params;

    try {
        const unaCiudad = await Ciudad.findByPk(id);
        if (!unaCiudad) {
            return res.status(404).json({ok:false,
                msg: 'No existe una Persona con el id: ' + id
            })
        }


        res.json({
            ok:true,
            data:unaCiudad});

    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
};


const ciudadPost = async (req, res = response) => {

	const {nombre, pais} = req.body;

    const datos = req.body;
	const ciudad = new Ciudad({ nombre,pais });

	try {

        const newCiudad = await Ciudad.create(datos);




    	res.json({ok:true,
        	data:newCiudad
    	});

	} catch (error) {
    	console.log(error);
    	res.status(500).json({ok:false,
        	msg: 'Hable con el Administrador',
        	err: error
    	})

	}

};
const CiudadesDelete = async (req, res = response) => {
	const { id } = req.params;
  

	console.log(id);
 
	

	try {

    	const ciudad = await Ciudad.findByPk(id);
    	//const usuarioAutenticado = req.usuario;

    	if (!ciudad) {
        	return res.status(404).json({ok:false,
            	msg: 'No existe una ciudad con el id: ' + id
        	})
    	}


    	await ciudad.destroy();

    	res.json({ok:true,
        	ciudad:ciudad,
        	
    	});
    

	} catch (error) {
    	console.log(error);
    	res.status(500).json({ok:false,
        	msg: 'Hable con el Administrador',
        	err: error
    	})

	}

}

const updateCiudad = async (req, res = response) => {
    const { id } = req.params; 
    const { nombre, pais } = req.body; 

    try {
        const ciudad = await Ciudad.findByPk(id);

        if (!ciudad) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una ciudad con el id: ${id}`
            });
        }

        
        if (nombre) ciudad.nombre = nombre;
        if (pais) ciudad.apellido = pais;
       

        await ciudad.save();

        res.json({
            ok: true,
            data: ciudad
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
    ciudadByIdGet,CiudadesDelete, ciudadPost,updateCiudad, ciudadesGet
}
