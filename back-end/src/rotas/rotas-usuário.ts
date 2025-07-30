import { Router } from "express";
import ServicosUsuario from "../serviços/serviços-usuário";

const RotasUsuario = Router();
RotasUsuario.post("/login", ServicosUsuario.logarUsuario);
RotasUsuario.post("/verificar-cpf/:cpf", ServicosUsuario.verificarCpfExistente);
export default RotasUsuario;