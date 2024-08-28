const { Router } = require('express');
const { 
 usuarioGet,
 obtenerPersona
} = require('../controllers/usuario_controller');
const router = Router();

router.get('/', usuarioGet);
router.get('/persona/:id', obtenerPersona);
module.exports = router;