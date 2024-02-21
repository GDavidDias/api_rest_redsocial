
//Acciones de prueba
const pruebaUser = (req,res)=>{
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js"
    })
};


//Exportar Acciones
module.exports = {
    pruebaUser
}