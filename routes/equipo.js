const { Router } = require('express');
const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {existeEquipoPorId} = require('../helpers/db-validators')
const {
    obtenerEquiposGet,
    obtenerEquipoGet,
    crearEquipoPost, 
    actualizarEquipoPut, 
    borrarEquipoDelete
} = require('../controllers/equipo');

const router = Router();

router.get('/',obtenerEquiposGet)
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEquipoPorId ),
    validarCampos,
], obtenerEquipoGet );
router.post('/',crearEquipoPost)
router.put('/:id',actualizarEquipoPut)
router.delete('/:id',borrarEquipoDelete)
module.exports = router