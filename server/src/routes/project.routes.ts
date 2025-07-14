import express from "express";
import auth from "../middlewares/auth";
import projectController from "../controllers/project.controller";

const router = express.Router();

// Rota para criar projeto
router.post("/create", auth, projectController.create);

// Rota para editar projeto
router.put("/id/:id", auth, projectController.edit);

// Rota para ver todos os projetos
router.get("/my", auth, projectController.returnProjects);

// Rota para deletar projeto
router.delete("/id/:id", auth, projectController.deleteProject);

// Rota para ver projeto por ID
router.get("/id/:id", auth, projectController.returnProjectById);

// Rota para ver projetos públicos
router.get("/public", projectController.returnPublicProjects);

export default router;
