import servidor from "./servidor";

export function servicoCadastrarLiderBanda(lider) {
  return servidor.post("/lideres-banda", lider);
}

export function servicoBuscarLiderBanda(cpf) {
  const cpfLimpo = cpf.replace(/[.-]/g, '');
  return servidor.get(`/lideres-banda/${cpfLimpo}`);
}