const {Equipo} = require("../models"); // Import the Equipo model
const { isValidObjectId } = require("../helpers/mongo-verify");
const { now } = require("mongoose");




const obtenerEquiposGet = async (req, res = response) => {


    const { limite = 5, desde = 0 } = req.query;
    //const query = { estado: true };
 
    try {
      const [total, equipos] = await Promise.all([
        Equipo.countDocuments(),
        Equipo.find({})
          .skip(Number(desde))
          .sort({nombre:1})
          //.limit(Number(limite)),
      ]);
 
      res.json({ Ok: true, total: total, resp: equipos });
    } catch (error) {
      res.json({ Ok: false, resp: error });
    }
}
const obtenerEquipoGet = async (req, res = response) => {
    const { id } = req.params;
    try {
      const equipo = await Equipo.findById(id);
       
      res.json({ Ok: true, resp: equipo });
    } catch (error) {
      res.json({ Ok: false, resp: error });
    }
  };
  
  const crearEquipoPost = async (req, res = response) => {


    const body = req.body;
   
    try {
  
  
      const equipoDB = await Equipo.findOne({ nombre_equipo: body.nombre_equipo });
  
  
      if (equipoDB) {
        return res
        //.status(400)
        .json({
          Ok: false,
          msg: `El Equipo ${body.nombre_equipo}, ya existe`,
        });
      }
  
  
   
      const equipo = new Equipo(body);
  
  
      // Guardar DB
      await equipo.save();
  
  
  
  
      res
      //.status(201)
      .json({ Ok: true, msg: 'Equipo Insertado', resp: equipo});
    } catch (error) {
      //console.log("ERROR:INSERTAR",error);
  
  
      res.json({ Ok: false, msg:'Error al Insertar Heroe', resp: error });
    }
  };
  const actualizarEquipoPut = async (req, res = response) => {
    const { id } = req.params;
  
  
    const data  = req.body;
  
  
    try {
  
  
     
      if (data.nombre_equipo) {
          const equipoDB = await Equipo.findOne({ nombre_equipo: data.nombre_equipo });
  
  
          if (equipoDB) {
            return res.status(400).json({
              msg: `El Equipo ${data.nombre_equipo}, ya existe en la BD`,
            });
          }
      }
     
     
      const equipo = await Equipo.findByIdAndUpdate(id, data, {
        new: true,
      });
  
  
      res.json({ Ok: true, msg: 'Equipo Actualizado', resp: equipo });
    } catch (error) {
      console.log("ERROR_MODIFICAR",error);
      res.json({ Ok: false, resp: error });
    }
  };
  const borrarEquipoDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
  
  
      const equipo = await Equipo.findById(id);
  
  
      if (!equipo){
        return res.status(400).json({
          msg: `El Equipo con ${id}, no existe en la BD`,
        });
  
  
      }
  
  
      /*
      const [total, multimediaheroe] = await Promise.all([
        MultimediaHeroe.countDocuments({ IdHeroe: id }),
        MultimediaHeroe.find({ IdHeroe: id})
          //.limit(Number(limite)),
      ]);
  
  
      if (total > 0){
        return res
        //.status(400)
        .json({
          Ok: false,
          msg: `El Heroe tiene (${total}) multimedias asignadas y no puede ser borrado....`,
        });
      }
      else{
        const heroeBorrado = await Heroe.findByIdAndDelete(id);
  
  
        res.json({ Ok: true, resp: heroeBorrado });
  
  
      }
      */
  
  
      const equipoBorrado = await Equipo.findByIdAndDelete(id);
  
  
      res.json({ Ok: true, resp: equipoBorrado });
  
  
    } catch (error) {
      console.log("ERROR_BORRADO",error);
      res.json({ Ok: false, resp: error });
    }
  };
  
  
module.exports = {
    obtenerEquiposGet, obtenerEquipoGet, crearEquipoPost, actualizarEquipoPut, borrarEquipoDelete
};






/* 
PORT = 8080
BD = 3307
SECRETORPRIVATEKEY = asdasdadsadasd

MONGODB_CNN =mongodb+srv://jcarrancho10:Cl1v1st0n@clusterdatabase.4y8pc.mongodb.net/prueba?retryWrites=true&w=majority&appName=ClusterDataBase
PASS = Cl1v1st0n    
 */
