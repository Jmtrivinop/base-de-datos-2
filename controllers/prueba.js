const {response, request} = require('express')


const pruebaGet = (req, res = response) => {


    const query = req.query;


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page=1, limit=10} = req.query;


    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'get API - Controller',
        query,
        q,
        nombre,
        apikey,
        page,
        limit
       })
}


module.exports = {
    pruebaGet
}
