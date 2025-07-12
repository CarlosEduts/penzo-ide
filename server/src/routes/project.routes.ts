import express from "express";
import auth from "../middlewares/auth";
import projectController from "../controllers/project.controller";

const router = express.Router();

// Rota para criar projeto
router.post("/create", auth, projectController.create);

// Rota para editar projeto
router.put("/:id", auth, projectController.edit);

// Rota para ver todos os projetos
router.get("/my-projects", auth, projectController.returnProjects);

// Rota para deletar projeto
router.delete("/:id", auth, projectController.deleteProject);

export default router;
