const { Router } = require('express');
const { check } = require('express-validator');



const {validarCampos} = require('../middlewares/validar-campos')

const { obtenerFutbolistas,
        crearFutbolistasPost,
        actualizarFutbolistaPut,
        borrarFutbolistaDelete
 } = require('../controllers/futbolistas');


const { existeEquipoPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', obtenerFutbolistas );
router.post('/', crearFutbolistasPost );
router.put('/:id', actualizarFutbolistaPut );
router.delete('/:id', borrarFutbolistaDelete );
module.exports = router;