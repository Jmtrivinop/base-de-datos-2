const Equipo = require('../models/Equipos');  // Import the Equipo model

const obtenerEquiposGet = async (req, res) => {
    try {
        const equipos = await Equipo.find();  // Fetch all documents
        console.log('Equipos found:', equipos);  // Log to console to verify

        res.json({
            equipos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error fetching equipos'
        });
    }
};


module.exports = {
    obtenerEquiposGet
};






/* 
PORT = 8080
BD = 3307
SECRETORPRIVATEKEY = asdasdadsadasd

MONGODB_CNN =mongodb+srv://jcarrancho10:Cl1v1st0n@clusterdatabase.4y8pc.mongodb.net/prueba?retryWrites=true&w=majority&appName=ClusterDataBase
PASS = Cl1v1st0n    
 */
