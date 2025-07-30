import { Perfil } from "../entidades/usuario";

export default function verificarPerfilMusicoLider(request, response, next) {
  if (request.perfil === Perfil.MUSICO_LIDER) return next();
  else return response.status(401).json({ erro: "Acesso não autorizado para este perfil." });
};