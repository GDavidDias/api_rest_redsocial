const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");
const {auth} = require("../middlewares/auth")

//Definir Rutas
router.get("/prueba-follow", FollowController.pruebaFollow);
router.post("/save", auth, FollowController.save)
router.delete("/unfollow/:id", auth, FollowController.unfollow)

//exportar Router
module.exports = router;
