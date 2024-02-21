const mongoose = require("mongoose");

const connection = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/mi_redsocial");
        console.log("Conectado correctamente a la BD: mi_redsocial")      ;

    }catch(error){
        console.log(error)
        throw new Error("no se ha podido conectar a la BD");
    }
};

module.exports = {
    connection
}