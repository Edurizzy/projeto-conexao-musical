import { Router } from "express";
import ServicosUsuario from "../serviços/serviços-usuário";

const rotasUsuario = Router();
rotasUsuario.post("/login", ServicosUsuario.logarUsuario);
rotasUsuario.post("/verificar-cpf/:cpf", ServicosUsuario.verificarCpfExistente);
export default rotasUsuario;