import servidor from "./servidor";

export function servicoCadastrarMusicoLider(lider) {
  return servidor.post("/musicos-lideres", lider);
}

export function servicoBuscarMusicoLider(cpf) {
  const cpfLimpo = cpf.replace(/[.-]/g, '');
  return servidor.get(`/musicos-lideres/${cpfLimpo}`);
}