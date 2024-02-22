//Importar dependencia y modulos
const bcrypt = require("bcrypt");
const User = require("../models/user");

//Acciones de prueba
const pruebaUser = (req,res)=>{
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js"
    })
};

//Registro de usuarios
const register = async(req,res)=>{
    //Recoger datos de peticion
    let params = req.body;

    //Comprobar que llegan bien (+validacion)
    if(!params.name || !params.email || !params.password || !params.nick){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    //Control de usuarios duplicados
    try{

        let UserFind = await User.find({ $or: [
                            {email: params.email.toLowerCase()},
                            {nick: params.nick.toLowerCase()}
                        ] }).exec()

        //console.log("UserFind:",UserFind);

        if(UserFind && UserFind.length >=1){
            return res.status(200).json({
                status:"success",
                message: "El usuario ya existe"
            })
        }

        //Cifrar la contraseña
        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        //Crear objeto de usuario con datos validados
        let UserToSave = new User(params)    

        //Guardar usuario en la BD
        let userStored = await UserToSave.save();
        console.log(userStored);

        if(userStored){
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                message: "Usuario Registrado Correctamente",
                user: userStored
            });
        };


    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Error en la busqueda de usuarios duplicados",
            error: error.message
        })
    }
};


const login = (req, res)=>{
    //Recoger parametros de body

    //Buscar en BD si existe email o usuario

    //Comprobar su contraseña

    //Devolver Token

    //Devolver Datos de Usuario


    
    return res.status(200).json({
        status: "success",
        message: "accion de login"
    })

};


//Exportar Acciones
module.exports = {
    pruebaUser,
    register,
    login
}