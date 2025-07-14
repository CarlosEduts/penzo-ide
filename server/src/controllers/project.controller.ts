import Project from "../models/project.model";
import { Request, Response } from "express";

interface IUserRequest extends Request {
  userData?: { _id: string };
}

// Função para criar projeto
const createProject = async (req: IUserRequest, res: Response) => {
  try {
    const { name, codeHtml, codeCss, codeJs, isPublic } = req.body;
    const userId = req.userData?._id;
    const project = await Project.create({
      name,
      codeHtml,
      codeCss,
      codeJs,
      isPublic,
      owner: userId,
    });

    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar projeto." });
    console.log(err);
  }
};

// Função para editar projeto
const editProject = async (req: IUserRequest, res: Response) => {
  const { id } = req.params;
  const { name, codeHtml, codeCss, codeJs, isPublic } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({ message: "Projeto não encontrado." });
      return;
    }

    if (project?.owner.toString() !== req.userData?._id) {
      res.status(403).json({ message: "Acesso negado." });
      return;
    }

    if (name !== undefined) project.name = name;
    if (codeHtml !== undefined) project.codeHtml = codeHtml;
    if (codeCss !== undefined) project.codeCss = codeCss;
    if (codeJs !== undefined) project.codeJs = codeJs;
    if (isPublic !== undefined) project.isPublic = isPublic;

    await project.save();
  } catch {
    res.status(500).json({ message: "Erro ao editar projeto" });
  }
};

// Função para deletar projeto
const deleteProject = async (req: IUserRequest, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({ message: "Projeto não encontrado." });
      return;
    }

    if (project?.owner.toString() !== req.userData?._id) {
      res.status(403).json({ message: "Acesso negado." });
      return;
    }

    await project.deleteOne();
    res.status(200).json({ message: "Projeto deletado com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar projeto." });
    console.log(err);
  }
};

// Função para retornar projetos do usuário autenticado
const returnProjects = async (req: IUserRequest, res: Response) => {
  const userId = req.userData?._id;
  const projects = await Project.find({ owner: userId });
  res.json(projects);
};

// Função para retornar projetos públicos
const returnPublicProjects = async (req: Request, res: Response) => {
  const projects = await Project.find({ isPublic: true });
  res.json(projects);
};

// Função para retornar projeto por _id
const returnProjectById = async (req: IUserRequest, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ message: "Projeto não encontrado." });
      return;
    }
    if (project.isPublic || project.owner.toString() === req.userData?._id) {
      res.json(project);
      return;
    } else {
      res.status(403).json({ message: "Acesso negado." });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar projeto." });
    console.error(err);
  }
};

const projectController = {
  createProject,
  editProject,
  deleteProject,
  returnProjectById,
  returnPublicProjects,
  returnProjects,
};
export default projectController;
