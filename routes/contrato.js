const { Router } = require('express');
const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {existeEquipoPorId} = require('../helpers/db-validators')
const {
    obtenerContratos,
    crearContratos,
    actualizarContratoPut,
    borrarContratoDelete
} = require('../controllers/contrato');

const router = Router();

router.get('/',obtenerContratos)
router.post('/',crearContratos)
router.put('/:id',actualizarContratoPut)
router.delete('/:id',borrarContratoDelete)

module.exports = router