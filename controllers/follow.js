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
const save = async(req, res)=>{
    //Conseguir datos por body (usuario al que voy a seguir)
    const params = req.body;

    //Sacar id del usuario identificado
    const identity = req.user;

    //Crear objeto con modelo follow
    let userToFollow = new Follow({
        user : identity.id,
        followed : params.followed,
    });

    try{
        //Guardar objeto en bd
        let userFollowed = await userToFollow.save();

        if(userFollowed){
            return res.status(200).send({
                status: "success",
                message: "mensaje enviado desde: controllers/follow.js",
                identity: req.user,
                user: userFollowed
            });
        };
    

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Error en save de follows",
            error: error.message
        })
    }

};


//Accion de borrar un follow (dejar de seguir)
const unfollow = (req, res)=>{
    //Recoger id usuario identificado

    //Recoger id de usuario a dejar de seguir

    //Find de coincidencias y hacer remove
    

    return res.status(200).send({
        status:"success",
        identity: req.user
    })
};

//Accion de listado de usuarios que estoy siguiendo

//Accion de usuarios que me siguen

//Exportar Acciones
module.exports = {
    pruebaFollow,
    save,
    unfollow
}