const express = require("express");
const router = express.Router();
const PublicationController = require("../controllers/publication");

//Definir Rutas
router.get("/prueba-publication", PublicationController.pruebaPublication);

//exportar Router
module.exports = router;
