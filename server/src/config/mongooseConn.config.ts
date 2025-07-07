import mongoose from "mongoose";
import database from "./db.config";

if (!database.local.databaseUrl) {
  throw new Error(
    "Erro ao conectar com o banco de dados ...: A URL do banco de dados não foi definida."
  );
}

mongoose.Promise = global.Promise;

export default mongoose.connect(database.local.databaseUrl).then(
  () => {
    console.log("Conexão com o banco de dados feito com sucesso!");
  },
  (err) => {
    console.log(`Erro ao conectar com o banco de dados ...: ${err}`);
    process.exit();
  }
);
