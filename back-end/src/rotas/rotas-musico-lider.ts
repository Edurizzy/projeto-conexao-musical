import { Router } from "express";
import verificarToken from "../middlewares/verificar-token";
import verificarPerfilMusicoLider from "../middlewares/verificar-perfil-musico-lider";
import ServicosMusicoLider from "../serviços/serviços-musico-lider";

const RotasMusicoLider = Router();
RotasMusicoLider.post("/", ServicosMusicoLider.cadastrarMusicoLider);
RotasMusicoLider.get("/:cpf", verificarToken, verificarPerfilMusicoLider, ServicosMusicoLider.buscarMusicoLider);
export default RotasMusicoLider;