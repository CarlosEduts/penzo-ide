import { Request, Response } from "express";
import User from "../models/user.model";

const register = async (req: Request, res: Response) => {
  try {
    const isUserExists = await User.find({ email: req.body.email });
    if (isUserExists.length > 0) {
      res.status(400).json({ message: "Usuário já cadastrado." });
      return;
    }

    const newUser = new User(req.body);
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: { name: user.name, email: user.email, id: user._id },
      token,
    });
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      res.status(401).json({
        error: "Erro ao Logar! Verifique as suas credenciais de autenticação!",
      });
      return;
    }
    const token = await user.generateAuthToken();
    res.status(201).json({
      message: "Usuário(a) logado com sucesso!",
      user: { name: user.name, email: user.email, id: user._id },
      token,
    });
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

// Método responsável por retornar um determinado 'User'
interface IUserProfileRequest extends Request {
  userData?: { _id: string; name: string; email: string };
}
const returnUserProfile = async (req: IUserProfileRequest, res: Response) => {
  await res.json(req.userData);
};

const userController = { register, login, returnUserProfile };
export default userController;
