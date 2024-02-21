const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");

//Definir Rutas
router.get("/prueba-follow", FollowController.pruebaFollow);

//exportar Router
module.exports = router;
