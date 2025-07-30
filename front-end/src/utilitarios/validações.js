import { estilizarErro } from "./estilos";

const ERRO_CAMPO_OBRIGATORIO = "Campo obrigatório não preenchido";
const ERRO_CONFIRMACAO_SENHA = "As senhas não conferem";
const ERRO_FORMATO_INVALIDO = "Formato de email inválido";

export function validarCamposObrigatórios(campos) {
    let erros = {};
    for (const campo in campos) {
        if (!campos[campo]) {
            erros[campo] = ERRO_CAMPO_OBRIGATORIO;
        }
    }
    return erros;
}

export function validarConfirmacaoSenha(senha, confirmacao) {
    let erros = {};
    if (senha !== confirmacao) {
        erros.confirmacao = ERRO_CONFIRMACAO_SENHA;
    }
    return erros;
}

export function validarCampoEmail(email) {
    let erros = {};
    const formatoEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email && !formatoEmail.test(email)) {
        erros.email = ERRO_FORMATO_INVALIDO;
    }
    return erros;
}

export function checarListaVazia(lista) {
    return Object.keys(lista).length === 0;
}

export function MostrarMensagemErro({ mensagem }) {
    if (mensagem) {
        return <small className={estilizarErro()}>{mensagem}</small>;
    }
    return null;
}