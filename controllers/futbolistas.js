const { response } = require("express");

const {Futbolista,Equipo} = require("../models");
//const Equipo = require("../models/equipo")

const { isValidObjectId } = require("../helpers/mongo-verify");
const { now } = require("mongoose");

const obtenerFutbolistas = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  //const query = { estado: true };

  try {
    const [total, futbolistas] = await Promise.all([
      Futbolista.countDocuments(),
      Futbolista.find({})
        .populate("idEquipo", "nombre_equipo")
        .skip(Number(desde))
        .sort({nombre:1})
        //.limit(Number(limite)),
    ]);
    
    res.json({ Ok: true, total: total, resp: futbolistas });
  } catch (error) {
    console.log("ERROR",error);
    res.json({ Ok: false, resp: error });
  }
};
const crearFutbolistasPost = async (req, res = response) => {


    const body = req.body;
   
    try {
  
  
      const futbolistaDB = await Futbolista.findOne({ nombre: body.nombre });
  
  
      if (futbolistaDB) {
        return res
        //.status(400)
        .json({
          Ok: false,
          msg: `El Equipo ${body.nombre}, ya existe`,
        });
      }
  
  
   
      const futbolista = new Futbolista(body);
  
  
      // Guardar DB
      await futbolista.save();
  
  
  
  
      res
      //.status(201)
      .json({ Ok: true, msg: 'Futbolista Insertado', resp: futbolista});
    } catch (error) {
      //console.log("ERROR:INSERTAR",error);
  
  
      res.json({ Ok: false, msg:'Error al Insertar futbolista', resp: error });
    }
  };

  const actualizarFutbolistaPut = async (req, res = response) => {
    const { id } = req.params; // ID del futbolista a actualizar
    const data = req.body;
  
    try {
      // Verificar si existe un futbolista con el mismo nombre
      if (data.nombre) {
        const futbolistaDB = await Futbolista.findOne({ nombre: data.nombre });
  
        if (futbolistaDB && futbolistaDB.id !== id) {
          return res.status(400).json({
            Ok: false,
            msg: `El futbolista con el nombre ${data.nombre} ya existe en la BD`,
          });
        }
      }
  
      // Actualizar el futbolista
      const futbolistaActualizado = await Futbolista.findByIdAndUpdate(id, data, { new: true });
  
      // Verificar si el futbolista fue encontrado y actualizado
      if (!futbolistaActualizado) {
        return res.status(404).json({
          Ok: false,
          msg: `El futbolista con ID ${id} no existe en la BD`,
        });
      }
  
      // Responder con la actualización
      res.json({ Ok: true, msg: 'Futbolista Actualizado', resp: futbolistaActualizado });
    } catch (error) {
      console.log("ERROR_MODIFICAR_FUTBOLISTA", error);
      res.status(500).json({ Ok: false, resp: error });
    }
  };
  const borrarFutbolistaDelete = async (req, res = response) => {
    const { id } = req.params; // ID del futbolista a eliminar
  
    try {
      // Buscar el futbolista por ID
      const futbolista = await Futbolista.findById(id);
  
      // Verificar si el futbolista existe
      if (!futbolista) {
        return res.status(400).json({
          Ok: false,
          msg: `El futbolista con ID ${id} no existe en la BD`,
        });
      }
  
      // Borrar el futbolista
      const futbolistaBorrado = await Futbolista.findByIdAndDelete(id);
  
      // Responder con el resultado
      res.json({ Ok: true, msg: 'Futbolista Borrado', resp: futbolistaBorrado });
    } catch (error) {
      console.log("ERROR_BORRADO_FUTBOLISTA", error);
      res.status(500).json({ Ok: false, resp: error });
    }
  };
  
module.exports = {
    //crearHeroe,
    obtenerFutbolistas,
    crearFutbolistasPost,
    actualizarFutbolistaPut,
    borrarFutbolistaDelete

  };