//Importar modelo
const Follow = require("../models/follow");
const User = require("../models/user");

//Importar dependencias
const mongoosePagination = require("mongoose-paginate-v2");

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
const unfollow = async (req, res)=>{
    //Recoger id usuario identificado
    const userId = req.user.id;

    //Recoger id de usuario a dejar de seguir
    const followedId = req.params.id;

    try{
        //Find de coincidencias y hacer delete
        let followDelete = await Follow.findOneAndDelete({
                "user": userId,
                "followed": followedId
        });

        if(followDelete){
            return res.status(200).send({
                status:"success",
                identity: req.user,
                message: "Follow eliminado correctamente",
                followDelete
            })

        }else{
            return res.status(200).send({
                status: "success",
                identity: req.user,
                message: "No existe Follow a eliminar"
            })
        }


    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Error en unfollow de follows",
            error: error.message
        })
    }


};

//Accion de listado de usuarios que cualquier usuario esta siguiendo (siguiendo)
const following = async(req, res) => {
    //Sacar id de usuario identificado
    let userId = req.user.id;

    //Comprobar si llega id por parametro en url
    if (req.params.id){
        userId = req.params.id;
    }

    //Comprobar si llega la pagina, sino seria la pagina 1
    let page = 1;

    if(req.params.page){
        page = req.params.page
    }

    //Usuarios por pagina que quiero mostrar
    const itemsPerPage = 5;

    //Find a follow, popular datos de los usuarios y paginar con mongoose paginate
    let follows = await Follow.find({user:userId}).populate("user followed","-password -role -__v").exec();

    //Sacar un array de ids de los suarios que me siguen y los que sigo 

    return res.status(200).send({
        status:  "success",
        message: "Listado de usuarios que estoy siguiendo",
        user: req.user.id,
        follows: follows,
        userId:userId,
        page:page

    });
};

//Accion de usuarios que siguen a cualquier otro usuario (soy seguido)
const followers = (req, res) =>{
    return res.status(200).send({
        status:  "success",
        message: "Listado de usuarios que me siguen"
    });
}

//Exportar Acciones
module.exports = {
    pruebaFollow,
    save,
    unfollow,
    following,
    followers
}