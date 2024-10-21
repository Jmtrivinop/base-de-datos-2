const mongoose = require('mongoose')


const dbMongo = async() => {


    try {


        await mongoose.connect(process.env.MONGODB_CNN,{
            //useNewUrlParser: true,
            //useUnifiedTopology: true
            //useCreateIndex: true,
            //useFindAndModify: false
        })


        console.log('Base de Datos de Mongo online...')
       
    } catch (error) {
        console.log(error)
        throw new Error('Error al levantar la BD de MongoDb...')
       
    }


}


module.exports  = {
    dbMongo
}


/* PORT = 8080
BD = 3307
SECRETORPRIVATEKEY = "asdadsasdasdasdasdadsads"

MONGODB_CNN=mongodb+srv://jcarrancho10:Cl1v1st0n@clusterdatabase.4y8pc.mongodb.net/prueba
PASS=Cl1v1st0n
USER = jcarrancho10 */