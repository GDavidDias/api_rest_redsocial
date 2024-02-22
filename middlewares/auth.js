//Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//Importar clave secreta
const libjwt = require("../services/jwt")
const secret = libjwt.secret;

//!MIDDLEWARE de autenticacion
exports.auth = (req, res, next)=>{
    
    //Comprobar si llega la cabecera de autenticacion
    if(!req.headers.authorization){
        return res.status(403).json({
            status: "error",
            message: "La peticion no tiene la cabecera de autenticacion"
        })
    };
    
    //LImpiar el token
    let token = req.headers.authorization.replace(/['"]+/g, '');
    
    //Decodificar el token
    try{
        let payload = jwt.decode(token, secret);

        //console.log(payload);

        //comprobar expiracion del token
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                status: "error",
                message: "Token expirado",
                error
            })
        };

        //Agregar datos de usuarios a la request
        req.user = payload;

    }catch(error){
        return res.status(404).send({
            status: "error",
            message: "Token invalido",
            error
        })
    }
    
    
    //Pasar a la ejecucion de la accion
    next();

};