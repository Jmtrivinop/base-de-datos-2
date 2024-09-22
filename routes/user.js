const { Router } = require('express');
const {validarJWT} =require('../middlewares/validar_jwt')
const { 

 usuarioGet,
 obtenerPersona,
 usuarioPost,
 usuarioDelete,
 updateUsuario, 
 comprobarContraseña,
 usuarioByIdGet

} = require('../controllers/usuario_controller');
const router = Router();

router.get('/',usuarioGet);
router.get('/:id',usuarioByIdGet);
router.get('/persona/:id',obtenerPersona);
router.post('/',usuarioPost);
router.delete('/:id', usuarioDelete);
router.put('/:id',updateUsuario);
router.post('/comprobar/', comprobarContraseña);
module.exports = router;