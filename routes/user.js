const { Router } = require('express');
const {validarJWT} =require('../middlewares/validar_jwt')
const { 

 usuarioGet,
 obtenerPersona,
 usuarioPost,
 usuarioDelete,
 updateUsuario, 
 comprobarContraseña,

} = require('../controllers/usuario_controller');
const router = Router();

router.get('/', validarJWT,usuarioGet);
router.get('/persona/:id', validarJWT,obtenerPersona);
router.post('/', validarJWT,usuarioPost);
router.delete('/:id',validarJWT, usuarioDelete);
router.put('/:id', validarJWT,updateUsuario);
router.post('/comprobar/', comprobarContraseña);
module.exports = router;