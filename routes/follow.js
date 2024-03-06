const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");
const {auth} = require("../middlewares/auth")

//Definir Rutas
router.get("/prueba-follow", FollowController.pruebaFollow);
router.post("/save", auth, FollowController.save)

//exportar Router
module.exports = router;
