const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const {auth} = require("../middlewares/auth");

//Definir Rutas
router.get("/prueba-usuario", auth, UserController.pruebaUser);
router.post("/register", UserController.register)
router.post("/login", UserController.login);
router.get("/profile/:id", auth, UserController.profile);

//exportar Router
module.exports = router;
