const { Router } = require('express');
const { check } = require('express-validator');



const {validarCampos} = require('../middlewares/validar-campos')

const { obtenerFutbolistas,
        crearFutbolistasPost
 } = require('../controllers/futbolistas');


const { existeEquipoPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', obtenerFutbolistas );
router.post('/', crearFutbolistasPost );
module.exports = router;