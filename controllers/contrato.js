const { Contrato } = require("../models");
const { isValidObjectId } = require("../helpers/mongo-verify");

const obtenerContratos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
  
    try {
      const [total, contratos] = await Promise.all([
        Contrato.countDocuments(),
        Contrato.find({})
          .populate("idEquipo", "nombre_equipo") 
          .populate("idFutbolista", "nombre apellidos") 
          .skip(Number(desde))
          .sort({ nombre: 1 })  
          .limit(Number(limite)),
      ]);
      
      res.json({ Ok: true, total, resp: contratos });
    } catch (error) {
      console.log("ERROR", error);
      res.json({ Ok: false, resp: error });
    }
};
const crearContratos = async (req, res = response) => {


    const { idFutbolista, idEquipo, fecha_inicio, fecha_fin, salario } = req.body;
   
    try {
  
  
      const contratosBD = await Contrato.findOne({ idFutbolista, idEquipo });
  
  
      if (contratosBD) {
        return res
        //.status(400)
        .json({
          Ok: false,
          msg: `Ya existe un contrato para el futbolista con ID ${idFutbolista} en el equipo con ID ${idEquipo}`,
        });
      }
  
  
   
      const contratos = new Contrato({
        idFutbolista,
        idEquipo,
        fecha_inicio,
        fecha_fin,
        salario
      });
  
  
      // Guardar DB
      await contratos.save();
  
  
  
  
      res
      //.status(201)
      .json({ Ok: true, msg: 'Contrato Insertado', resp: contratos});
    } catch (error) {
      //console.log("ERROR:INSERTAR",error);
  
  
      res.json({ Ok: false, msg:'Error al Insertar contrato', resp: error });
    }
  };
  const actualizarContratoPut = async (req, res = response) => {
    const { id } = req.params; 
    const data = req.body;
  
    try {

      if (data.idFutbolista && data.idEquipo) {
        const contratoExistente = await Contrato.findOne({ 
          idFutbolista: data.idFutbolista, 
          idEquipo: data.idEquipo 
        });
  
        if (contratoExistente) {
          return res.status(400).json({
            Ok: false,
            msg: `Ya existe un contrato para el futbolista con ID ${data.idFutbolista} en el equipo con ID ${data.idEquipo}`,
          });
        }
      }
  
      // Actualizar el contrato
      const contratoActualizado = await Contrato.findByIdAndUpdate(id, data, { new: true });
  
      // Responder con la actualización
      res.json({ Ok: true, msg: 'Contrato Actualizado', resp: contratoActualizado });
    } catch (error) {
      console.log("ERROR_MODIFICAR_CONTRATO", error);
      res.status(500).json({ Ok: false, resp: error });
    }
  };

  const borrarContratoDelete = async (req, res = response) => {
    const { id } = req.params; 
  
    try {
      // Buscar el contrato por ID
      const contrato = await Contrato.findById(id);
  
      // Verificar si el contrato existe
      if (!contrato) {
        return res.status(400).json({
          Ok: false,
          msg: `El contrato con ID ${id} no existe en la BD`,
        });
      }
  
      // Borrar el contrato
      const contratoBorrado = await Contrato.findByIdAndDelete(id);
  
      // Responder con el resultado
      res.json({ Ok: true, msg: 'Contrato Borrado', resp: contratoBorrado });
    } catch (error) {
      console.log("ERROR_BORRADO_CONTRATO", error);
      res.status(500).json({ Ok: false, resp: error });
    }
  };
  
  
module.exports = {
    obtenerContratos, crearContratos, actualizarContratoPut, borrarContratoDelete
};
