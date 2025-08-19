import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import rotasUsuario from "./rotas/rotas-usuario";
import rotasLiderBanda from "./rotas/rotas-lider-banda";
import rotasMusico from "./rotas/rotas-musico";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use("/usuarios", rotasUsuario);
app.use("/lideres-banda", rotasLiderBanda);
app.use("/musicos", rotasMusico);

app.listen(PORT, () => {
  console.log(`[server] Servidor rodando na porta ${PORT}`);
});

createConnection().then(() => console.log("[server] Conectado ao Banco de Dados"));