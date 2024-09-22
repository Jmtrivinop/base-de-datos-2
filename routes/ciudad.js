const { Router } = require('express');


const { ciudadByIdGet,
    ciudadPost,
    ciudadesGet,
    updateCiudad,
    CiudadesDelete

    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/ciudad');




const router = Router();


router.get('/', ciudadesGet);

router.get('/:id',ciudadByIdGet);


router.post('/', ciudadPost)
router.delete('/:id', CiudadesDelete)
router.put('/:id', updateCiudad)




module.exports = router;
