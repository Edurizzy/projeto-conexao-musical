import { Perfil } from "../entidades/usuário";

export default function verificarPerfilLiderBanda(request, response, next) {
  if (request.perfil === Perfil.LIDER_BANDA) return next();
  else return response.status(401).json({ erro: "Acesso não autorizado para este perfil." });
};