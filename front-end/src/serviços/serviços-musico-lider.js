import servidor from "./servidor";

export function servicoCadastrarMusicoLider(lider) {
  return servidor.post("/musicos-lideres", lider);
}

export function servicoBuscarMusicoLider(cpf) {
  return servidor.get(`/musicos-lideres/${cpf}`);
}