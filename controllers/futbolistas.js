const { response } = require("express");

const {Futbolista,Equipo} = require("../models");
//const Equipo = require("../models/equipo")

const { isValidObjectId } = require("../helpers/mongo-verify");
const { now } = require("mongoose");

const obtenerFutbolistas = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  //const query = { estado: true };

  try {
    const total = await Futbolista.countDocuments();
  
    
    const futbolistas = await Futbolista.find({})
      .skip(Number(desde))
      .limit(Number(limite))
      .sort({ nombre: 1 });
    

  
    res.json({ Ok: true, total, resp: futbolistas });
  } catch (error) {
    console.error("ERROR", error);
    res.status(500).json({ Ok: false, error: error.message });
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


module.exports = {
    //crearHeroe,
    obtenerFutbolistas,
    //obtenerEquipoGet,
    //actualizarHeroe,
    //borrarHeroe,
    crearFutbolistasPost
  };