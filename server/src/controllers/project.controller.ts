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

const returnProjects = async (req: IUserRequest, res: Response) => {
  const userId = req.userData?._id;
  const projects = await Project.find({ owner: userId });
  res.json(projects);
};

const projectController = { create, returnProjects };
export default projectController;
