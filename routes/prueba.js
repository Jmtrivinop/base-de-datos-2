const { Router } = require('express');


const { pruebaGet,
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/prueba');




const router = Router();


router.get('/', pruebaGet);


//router.post('/', usuariosPost);


//router.put('/:id', usuariosPut);


//router.delete('/:id', usuariosDelete);


//router.patch('/', usuariosPatch);


module.exports = router;
