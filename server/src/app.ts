import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Rotas da API
import index from "./routes/index";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/", index);

export default app;
