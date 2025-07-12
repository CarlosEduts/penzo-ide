import Project from "../models/project.model";
import { Request, Response } from "express";

interface IUserRequest extends Request {
  userData?: { _id: string };
}
const create = async (req: IUserRequest, res: Response) => {
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

const edit = async (req: IUserRequest, res: Response) => {
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

const returnProjects = async (req: IUserRequest, res: Response) => {
  const userId = req.userData?._id;
  const projects = await Project.find({ owner: userId });
  res.json(projects);
};

const projectController = { create, edit, returnProjects };
export default projectController;
