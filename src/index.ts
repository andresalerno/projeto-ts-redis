import express from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rotas
app.use(router);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});