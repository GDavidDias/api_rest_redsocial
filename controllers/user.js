//Importar dependencia y modulos
const bcrypt = require("bcrypt");

//Importar modelos
const User = require("../models/user");

//Importar servicios
const {createToken} = require("../services/jwt");


//Acciones de prueba
const pruebaUser = (req,res)=>{
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js",
        usuario: req.user
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


const login = async(req, res)=>{
    //Recoger parametros de body
    const params = req.body;

    if(!params.email || !params.password){
        return res.status(400).json({
            status: "error",
            message: "faltan datos por enviar"
        })
    };

    try{

        //Buscar en BD si existe email o usuario
        let userFinder = await User.findOne({email: params.email})
                                    //.select({password:0})  //uso el select para omitir la password en la busqueda del usuario
                                    .exec();

        if (!userFinder){
            return res.status(404).json({
                status: "error",
                message: "No existe el usuario"
            })
        }
        //Comprobar su contraseña
        const pwd = bcrypt.compareSync(params.password, userFinder.password);

        if(!pwd){
            return res.status(400).json({
                status: "error",
                message: "No te has identificado correctamente",
            })
        };

        //Devolver Token
        const token = createToken(userFinder);
    
        //Devolver Datos de Usuario -> no muestro password en objeto
        return res.status(200).json({
            status: "success",
            message: "Te has identificado correctamente",
            user: {
                id: userFinder._id,
                name: userFinder.name,
                nick: userFinder.nick
            },
            token
        });
    

    }catch(error){
        return res.status(404).json({
            status: "error",
            message: "Error en login",
            error: error.message
        })
    }
};


const profile = async(req, res)=>{
    //Recibir el parametro del id de usuario por url
    const id = req.params.id;
    if(!id){
        return res.status(404).send({
            status: "error",
            message: "Falta datos de id"
        })
    }

    try{
        //Consulta para obtener datos de usuario
        const userFind = await User.findById(id)
                                   .select({password:0, role:0})
                                   .exec();
        console.log(userFind);
    
        if(!userFind){
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            })
        };
    
        //Devolver resultado
        //Posteriormente: devolver informacion de follow
        return res.status(200).send({
            status:"success",
            message: "Usuario encontrado",
            usuario: userFind
        })

    }catch(error){
        return res.status(400).send({
            status: "error",
            message: "Error en endpoint profile",
            error: error.message
        })
    }


};

//Exportar Acciones
module.exports = {
    pruebaUser,
    register,
    login,
    profile
}