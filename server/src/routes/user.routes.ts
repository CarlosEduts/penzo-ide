import express from "express";
import auth from "../middlewares/auth";
import userController from "../controllers/user.controller";

const router = express.Router();

// Rota para criar usuário
router.post("/register", userController.register);

// Rota para login do usuário
router.post("/login", userController.login);

// Retornar os dados do perfil do usuário
router.get("/profile", auth, userController.returnUserProfile);

export default router;
