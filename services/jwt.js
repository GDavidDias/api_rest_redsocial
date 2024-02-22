//Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta para genera token
const secret = "clave_secreta_DEL_proyecto_REDsOCIAL_56238";

//Crear funcion para genera tokens
const createToken = (user) =>{
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.imagen,
        iat: moment().unix(),
        exp: moment().add(30,"days").unix,
    }

    //Devolver JWT token codificado
    return jwt.encode(payload, secret)
};

module.exports = createToken;