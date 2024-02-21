const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

//Definir Rutas
router.get("/prueba-usuario", UserController.pruebaUser);

//exportar Router
module.exports = router;
