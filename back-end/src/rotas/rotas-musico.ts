import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilMusico from "../middlewares/verificar-perfil-músico";
import ServicosMusico from "../serviços/serviços-músico";

const rotasMusico = Router();
rotasMusico.post("/", ServicosMusico.cadastrarMusico);
rotasMusico.get("/:cpf", verificarToken, verificarPerfilMusico, ServicosMusico.buscarMusico);
export default rotasMusico;