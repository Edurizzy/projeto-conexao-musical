import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import ContextoUsuario from "../../contextos/contexto-usuário";
import { estilizarBotao, estilizarBotaoRemover, estilizarDivCampo, estilizarInlineFlex, estilizarLabel, estilizarModal } from "../../utilitários/estilos";

export default function ModalConfirmacaoUsuario() {
    const { 
        usuarioLogado, setUsuarioLogado, 
        confirmacaoUsuario, setConfirmacaoUsuario, 
        setMostrarModalConfirmacao 
    } = useContext(ContextoUsuario);

    const navegar = useNavigate();

    function ocultar() {
        setMostrarModalConfirmacao(false);
        setConfirmacaoUsuario(null);
    }

    function finalizarCadastro() {
        // Lógica de navegação baseada no perfil
        if (confirmacaoUsuario.perfil === "musico_lider") {
            setUsuarioLogado({ ...confirmacaoUsuario, cadastrado: false });
            setMostrarModalConfirmacao(false);
            navegar("../cadastrar-musico-lider");
        } else {
            // No futuro, aqui entraria a lógica para o Músico Candidato
            // Por enquanto, vamos simular um cadastro bem-sucedido e ir para a página inicial
            setUsuarioLogado({ ...confirmacaoUsuario, cadastrado: true, status: 'ativo' }); // Simula o status ativo
            setMostrarModalConfirmacao(false);
            navegar("../pagina-inicial");
        }
    }

    return (
        <div className={estilizarModal()}>
            <div className={estilizarDivCampo()}>
                <label className={estilizarLabel(confirmacaoUsuario?.cor_tema)}>Tipo de Perfil:</label>
                <label>{confirmacaoUsuario?.perfil === 'musico_lider' ? 'Músico Líder' : 'Músico Candidato'}</label>
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
                <Button label="Corrigir" onClick={ocultar} className={estilizarBotaoRemover(confirmacaoUsuario?.cor_tema)} />
            </div>
        </div>
    );
}