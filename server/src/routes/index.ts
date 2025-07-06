import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Seja bem-vido a API Penzo-ide",
    version: "1.0.0",
  });
});

export default router;
