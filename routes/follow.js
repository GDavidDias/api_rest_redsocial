const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");
const {auth} = require("../middlewares/auth")

//Definir Rutas
router.get("/prueba-follow", FollowController.pruebaFollow);
router.post("/save", auth, FollowController.save)
router.delete("/unfollow/:id", auth, FollowController.unfollow);
router.get("/following/:id?/:page?", auth, FollowController.following);
router.get("/followers/:id?/:page?", auth, FollowController.followers);

//exportar Router
module.exports = router;
