import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import RotasUsuario from "./rotas/rotas-usuário";
import RotasMusicoLider from "./rotas/rotas-musico-lider";

const app = express();
const PORT = process.env.PORT || 3333;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/usuarios", RotasUsuario);
app.use("/musicos-lideres", RotasMusicoLider);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

createConnection().then(() => console.log("Conectado ao Banco de Dados"));