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
  
module.exports = {
    obtenerEquiposGet, obtenerEquipoGet
};






/* 
PORT = 8080
BD = 3307
SECRETORPRIVATEKEY = asdasdadsadasd

MONGODB_CNN =mongodb+srv://jcarrancho10:Cl1v1st0n@clusterdatabase.4y8pc.mongodb.net/prueba?retryWrites=true&w=majority&appName=ClusterDataBase
PASS = Cl1v1st0n    
 */
