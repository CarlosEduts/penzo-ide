import dotenv from "dotenv";
dotenv.config();

export default {
  local: {
    databaseUrl: process.env.DB_URI,
    secret: "password",
  },
};
