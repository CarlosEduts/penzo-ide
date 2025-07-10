import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongooseConn from "./config/mongooseConn.config";

const app = express();

// Rotas da API
import index from "./routes/index";
import userRouter from './routes/user.routes'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(morgan("dev"));
app.use(cors());

// Retornando a conexão via mongoose via external file usando 'app.set()'
app.set("mongoose connection", mongooseConn);

// Uso dos rotas da API
app.use("/api/", index);
app.use('/api', userRouter)

export default app;
