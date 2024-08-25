const { Router } = require('express');


const { personasGet,
    personaByIdGet,
    personasComoGet,
    personasByTipoDocumentoGet,
    personasByInitialGet

    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/prueba');




const router = Router();


router.get('/', personasGet
);

router.get('/:id',personaByIdGet);

router.get('/como/:termino',personasComoGet)
//router.post('/', usuariosPost);
router.get('/con/:Tipo_documento',personasByTipoDocumentoGet)
router.get('/empieza/:initial',personasByInitialGet)

//router.put('/:id', usuariosPut);


//router.delete('/:id', usuariosDelete);


//router.patch('/', usuariosPatch);


module.exports = router;
