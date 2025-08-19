import servidor from "./servidor";

export function servicoLogarUsuario(login) {
    return servidor.post("/usuarios/login", login);
}

export function servicoVerificarCpfExistente(cpf) {
    const cpfLimpo = cpf.replace(/[.-]/g, '');
    return servidor.post(`/usuarios/verificar-cpf/${cpfLimpo}`);
}