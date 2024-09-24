const { Router } = require('express');
const {validarJWT} =require('../middlewares/validar_jwt')
const { 

 usuarioGet,
 obtenerPersona,
 usuarioPost,
 usuarioDelete,
 updateUsuario, 
 login,
 usuarioByIdGet

} = require('../controllers/usuario_controller');
const router = Router();

router.get('/',validarJWT,usuarioGet);
router.get('/:id',validarJWT,usuarioByIdGet);
router.get('/persona/:id',obtenerPersona);
router.post('/',usuarioPost);
router.delete('/:id',validarJWT, usuarioDelete);
router.put('/:id',validarJWT,updateUsuario);
router.post('/login/', login);
module.exports = router;