//Importar modelo
const Follow = require("../models/follow");
const User = require("../models/user");

//Acciones de prueba
const pruebaFollow = (req,res)=>{
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/follow.js"
    })
};

//Accion de guardar un follow (accion de seguir)

//Accion de borrar un follow (dejar de seguir)

//Accion de listado de usuarios que estoy siguiente

//Accion de usuarios que me siguen

//Exportar Acciones
module.exports = {
    pruebaFollow
}