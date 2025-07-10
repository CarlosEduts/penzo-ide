import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email?: string;
}

interface IUserRequest extends Request {
  userData?: object;
}
export default (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Autorização não fornecida!" });
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    console.log(token);

    const decoded = jwt.verify(token, "secret") as JwtPayload;

    req.userData = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: `Falha na Autenticação ...: ${err}` });
    return;
  }
};
