import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilLiderBanda from "../middlewares/verificar-perfil-lider-banda";
import ServicosLiderBanda from "../serviços/serviços-lider-banda";

const rotasLiderBanda = Router();
rotasLiderBanda.post("/", ServicosLiderBanda.cadastrarLiderBanda);
rotasLiderBanda.get("/:cpf", verificarToken, verificarPerfilLiderBanda, ServicosLiderBanda.buscarLiderBanda);
export default rotasLiderBanda;