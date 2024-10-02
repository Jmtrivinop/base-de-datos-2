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

router.get('/',usuarioGet);
router.get('/:id',usuarioByIdGet);
router.get('/persona/:id',obtenerPersona);
router.post('/',validarJWT,usuarioPost);
router.delete('/:id',validarJWT, usuarioDelete);
router.put('/:id',validarJWT,updateUsuario);
router.post('/login/', login);
module.exports = router;