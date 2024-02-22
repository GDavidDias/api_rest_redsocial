//Importar dependencias
const{connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");


//Mensaje de Bienvenida
console.log("Api Node para RedSocial iniciada")

//Conexion a BD
connection();

//Crear servidor Node
const app = express();
const puerto = 3900;

//Configurar CORS
app.use(cors());

//Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended:true})); //cualquier datos que viene en formato urlencode, lo convierte en objeto js

//Cargar conf rutas
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes = require("./routes/follow");

app.use("/api/user", UserRoutes);
app.use("/api/publication", PublicationRoutes);
app.use("/api/follow", FollowRoutes);

//Ruta de prueba
app.get("/ruta-prueba", (req,res)=>{
    return res.status(200).json({
        "id":1,
        "nombre": "Guillolas",
        "web": "guillolas.net"
    })
})

//Poner servidor a escuchar peticion http
app.listen(puerto,()=>{
    console.log("Servidor de node ejecutandose en el puerto: ", puerto);
})
