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


};


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
};

const personasComoGet = async(req = request, res = response) => {


    const { termino } = req.params;


    console.log("TERMINO",termino)


    try {


        const results = await bdmysql.query(
            "SELECT * FROM persona WHERE nombre LIKE :searchTerm OR apellido LIKE :searchTerm ORDER BY nombre",
            {
                replacements: { searchTerm: `%${termino}%` },
                type: bdmysql.QueryTypes.SELECT
            }




           
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
};


const personasByTipoDocumentoGet = async (req = request, res = response) => {
    const { Tipo_documento } = req.params;

    try {
        const personas = await Persona.findAll({
            where: {
                Tipo_documento: Tipo_documento
            }
        });

        res.json({
            ok: true,
            data: personas
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
const personasByInitialGet = async (req = request, res = response) => {
    const { initial } = req.params;

    try {
        const personas = await Persona.findAll();

        const personasByInitial = personas.filter(persona => {
            return persona.nombre.startsWith(initial.toUpperCase());
        });

        res.json({
            ok: true,
            data: personasByInitial
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
const personasPost = async (req, res = response) => {

	const {nombre, apellido, fecha_nacimiento , Tipo_documento,'Numero Documento': Numero_Documento} = req.body;

    const datos = req.body;
	const persona = new Persona({ nombre, apellido, fecha_nacimiento , Tipo_documento, Numero_Documento });

	try {

        const newPersona = await Persona.create(datos);




    	res.json({ok:true,
        	data:newPersona
    	});

	} catch (error) {
    	console.log(error);
    	res.status(500).json({ok:false,
        	msg: 'Hable con el Administrador',
        	err: error
    	})

	}

};
const PersonasDelete = async (req, res = response) => {
	const { id } = req.params;
   //const { _id, password, google, correo, ...resto } = req.body;

	//const uid = req.uid;

	console.log(id);
 
	

	try {

    	const persona = await Persona.findByPk(id);
    	//const usuarioAutenticado = req.usuario;

    	if (!persona) {
        	return res.status(404).json({ok:false,
            	msg: 'No existe una persona con el id: ' + id
        	})
    	}

    	//Borrado Logico.
    	//await heroe.update({estado:false});

    	//Borrado de la BD
    	await persona.destroy();

    	res.json({ok:true,
        	persona:persona,
        	//autenticado:usuarioAutenticado
    	});
    

	} catch (error) {
    	console.log(error);
    	res.status(500).json({ok:false,
        	msg: 'Hable con el Administrador',
        	err: error
    	})

	}

}

const updatePersona = async (req, res = response) => {
    const { id } = req.params; 
    const { nombre } = req.body; 

    try {
      
        const persona = await Persona.findByPk(id);

      
        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una persona con el id: ${id}`
            });
        }

        if (nombre) {
            persona.nombre = nombre;
        }

       
        await persona.save();

      
        res.json({
            ok: true,
            data: persona
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
    personasGet, personaByIdGet, personasComoGet, personasByTipoDocumentoGet, personasByInitialGet,
    personasPost, PersonasDelete, updatePersona
}
