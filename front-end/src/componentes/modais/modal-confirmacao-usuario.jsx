import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import ContextoUsuario from "../../contextos/contexto-usuario";
import { estilizarBotao, estilizarBotaoRemover, estilizarDivCampo, estilizarInlineFlex, estilizarLabel, estilizarModal } from "../../utilitarios/estilos";
import formatarPerfil from "../../utilitarios/formatar-perfil";

export default function ModalConfirmacaoUsuario() {
    const { 
        setUsuarioLogado, 
        confirmacaoUsuario, 
        setMostrarModalConfirmacao 
    } = useContext(ContextoUsuario);

    const navegar = useNavigate();

    function ocultar() {
        setMostrarModalConfirmacao(false);
    }

    function finalizarCadastro() {
        if (confirmacaoUsuario.perfil === "lider_banda") {
            setUsuarioLogado({ ...confirmacaoUsuario, cadastrado: false });
            setMostrarModalConfirmacao(false);
            navegar("../cadastrar-lider-banda");
        } else if (confirmacaoUsuario.perfil === "musico") {
            // Na Etapa 1, o Músico não tem cadastro específico.
            // Aqui, chamaríamos o serviço para ativar o usuário no back-end.
            // Por simplicidade, vamos apenas logar e ir para a página inicial.
            alert("Cadastro de Músico realizado com sucesso! (Funcionalidade de ativação seria implementada aqui)");
            setUsuarioLogado({ ...confirmacaoUsuario, cadastrado: true, status: 'ativo' });
            setMostrarModalConfirmacao(false);
            navegar("../pagina-inicial");
        }
    }

    return (
        <div className={estilizarModal()}>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(confirmacaoUsuario?.cor_tema)}>Tipo de Perfil:</label>
                <label>{formatarPerfil(confirmacaoUsuario?.perfil)}</label>
            </div>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(confirmacaoUsuario?.cor_tema)}>CPF (nome de usuário):</label>
                <label>{confirmacaoUsuario?.cpf}</label>
            </div>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(confirmacaoUsuario?.cor_tema)}>Nome Completo:</label>
                <label>{confirmacaoUsuario?.nome}</label>
            </div>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(confirmacaoUsuario?.cor_tema)}>Email:</label>
                <label>{confirmacaoUsuario?.email}</label>
            </div>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(confirmacaoUsuario?.cor_tema)}>Questão de Segurança:</label>
                <label>{confirmacaoUsuario?.questão}</label>
            </div>

            <div className={estilizarInlineFlex()}>
                <Button label="Salvar" onClick={finalizarCadastro} className={estilizarBotao(confirmacaoUsuario?.cor_tema)} />
                <Button label="Corrigir" onClick={ocultar} className={estilizarBotaoRemover()} />
            </div>
        </div>
    );
}