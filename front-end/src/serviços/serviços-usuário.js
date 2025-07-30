import servidor from "./servidor";

export function servicoLogarUsuario(login) {
    return servidor.post("/usuarios/login", login);
}

export function servicoVerificarCpfExistente(cpf) {
    // A máscara do CPF inclui pontos e traço, que não podem ir na URL diretamente
    // Por isso, removemos eles antes de enviar
    const cpfLimpo = cpf.replace(/[.-]/g, '');
    return servidor.post(`/usuarios/verificar-cpf/${cpfLimpo}`);
}