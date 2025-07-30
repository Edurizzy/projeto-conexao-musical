import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";

import ContextoUsuario from "../../contextos/contexto-usuário";
import ModalConfirmacaoUsuario from "../../componentes/modais/modal-confirmação-usuário";
import { servicoVerificarCpfExistente } from "../../serviços/serviços-usuário";
import mostrarToast from "../../utilitarios/mostrar-toast";
import { CPF_MASCARA } from "../../utilitarios/máscaras";
import { MostrarMensagemErro, checarListaVazia, validarCampoEmail, validarCamposObrigatórios, validarConfirmacaoSenha } from "../../utilitarios/validações";
import { estilizarBotao, estilizarCard, estilizarDialog, estilizarDivCampo, estilizarDivider, estilizarDropdown, estilizarFlex, estilizarInputMask, estilizarInputText, estilizarLabel, estilizarLink, estilizarPasswordInput, estilizarSubtitulo, TEMA_PADRAO, opcoesCores } from "../../utilitarios/estilos";

export default function CadastrarUsuario() {
    const referenciaToast = useRef(null);
    const {
        usuarioLogado,
        mostrarModalConfirmacao, setMostrarModalConfirmacao,
        setConfirmacaoUsuario
    } = useContext(ContextoUsuario);

    const [dados, setDados] = useState({
        cpf: usuarioLogado?.cpf || "",
        nome: usuarioLogado?.nome || "",
        perfil: usuarioLogado?.perfil || "",
        email: usuarioLogado?.email || "",
        senha: "",
        confirmacao: "",
        questão: usuarioLogado?.questão || "",
        resposta: "",
        cor_tema: usuarioLogado?.cor_tema || TEMA_PADRAO
    });
    const [erros, setErros] = useState({});

    // ADAPTAÇÃO PARA O TEMA "CONEXÃO MUSICAL"
    const opcoesPerfis = [
        { label: "Músico Líder", value: "musico_lider" },
        { label: "Músico Candidato", value: "musico_candidato" },
    ];

    function alterarEstado(event) {
        const { name, value } = event.target;
        setDados({ ...dados, [name]: value });
    }

    function validarCampos() {
        if (usuarioLogado?.perfil) { // Lógica para alteração (futuro)
            return true;
        } else { // Lógica para cadastro
            const { perfil, cpf, nome, email, senha, confirmacao, questão, resposta } = dados;
            let errosObrigatorios = validarCamposObrigatórios({ perfil, cpf, nome, email, senha, confirmacao, questão, resposta });
            let errosEmail = validarCampoEmail(email);
            let errosSenha = validarConfirmacaoSenha(senha, confirmacao);

            const novosErros = { ...errosObrigatorios, ...errosEmail, ...errosSenha };
            setErros(novosErros);
            return checarListaVazia(novosErros);
        }
    }

    async function validarConfirmarCriacao() {
        if (validarCampos()) {
            try {
                await servicoVerificarCpfExistente(dados.cpf);
                setConfirmacaoUsuario(dados);
                setMostrarModalConfirmacao(true);
            } catch (error) {
                mostrarToast(referenciaToast, error.response.data.erro, "erro");
            }
        }
    }
    
    const ehConsulta = !!usuarioLogado?.perfil;

    return (
        <div className={estilizarFlex("center")}>
            <Toast ref={referenciaToast} position="bottom-center" />

            <Dialog visible={mostrarModalConfirmacao} onHide={() => setMostrarModalConfirmacao(false)} header="Confirme seus dados" className={estilizarDialog()}>
                <ModalConfirmacaoUsuario />
            </Dialog>

            <Card title={ehConsulta ? "Consultar Usuário" : "Cadastrar Usuário"} className={estilizarCard(dados.cor_tema)}>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(dados.cor_tema)}>Tipo de Perfil*:</label>
                    <Dropdown name="perfil" value={dados.perfil} options={opcoesPerfis} onChange={alterarEstado}
                        placeholder="-- Selecione --" disabled={ehConsulta} className={estilizarDropdown(erros.perfil, dados.cor_tema)} />
                    <MostrarMensagemErro mensagem={erros.perfil} />
                </div>

                <Divider className={estilizarDivider(dados.cor_tema)} />
                <h2 className={estilizarSubtitulo(dados.cor_tema)}>Dados Pessoais</h2>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(dados.cor_tema)}>CPF*:</label>
                    <InputMask name="cpf" mask={CPF_MASCARA} value={dados.cpf} onChange={alterarEstado}
                        disabled={ehConsulta} className={estilizarInputMask(erros.cpf, dados.cor_tema)} />
                    <MostrarMensagemErro mensagem={erros.cpf} />
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(dados.cor_tema)}>Nome Completo*:</label>
                    <InputText name="nome" value={dados.nome} onChange={alterarEstado}
                        disabled={ehConsulta} className={estilizarInputText(erros.nome, 400, dados.cor_tema)} />
                    <MostrarMensagemErro mensagem={erros.nome} />
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(dados.cor_tema)}>Email*:</label>
                    <InputText name="email" value={dados.email} onChange={alterarEstado}
                        className={estilizarInputText(erros.email, 400, dados.cor_tema)} />
                    <MostrarMensagemErro mensagem={erros.email} />
                </div>

                {!ehConsulta && <>
                    <Divider className={estilizarDivider(dados.cor_tema)} />
                    <h2 className={estilizarSubtitulo(dados.cor_tema)}>Dados de Login</h2>
                    <div className="flex flex-row">
                        <div className={estilizarDivCampo() + " mr-2"}>
                            <label className={estilizarLabel(dados.cor_tema)}>Senha*:</label>
                            <Password name="senha" value={dados.senha} onChange={alterarEstado} toggleMask className={estilizarPasswordInput(erros.senha)} feedback={false}/>
                        </div>
                        <div className={estilizarDivCampo()}>
                            <label className={estilizarLabel(dados.cor_tema)}>Confirmação*:</label>
                            <Password name="confirmacao" value={dados.confirmacao} onChange={alterarEstado} toggleMask className={estilizarPasswordInput(erros.confirmacao)} feedback={false}/>
                        </div>
                    </div>
                    <MostrarMensagemErro mensagem={erros.senha || erros.confirmacao} />
                    
                    <Divider className={estilizarDivider(dados.cor_tema)} />
                    <h2 className={estilizarSubtitulo(dados.cor_tema)}>Recuperação da conta</h2>
                    <div className={estilizarDivCampo()}>
                        <label className={estilizarLabel(dados.cor_tema)}>Questão de Segurança*:</label>
                        <InputText name="questão" value={dados.questão} onChange={alterarEstado}
                            placeholder="Ex: Qual era o nome do meu primeiro pet?" className={estilizarInputText(erros.questão, 400, dados.cor_tema)} />
                        <MostrarMensagemErro mensagem={erros.questão} />
                    </div>
                    <div className={estilizarDivCampo()}>
                        <label className={estilizarLabel(dados.cor_tema)}>Resposta*:</label>
                        <InputText name="resposta" value={dados.resposta} onChange={alterarEstado}
                             className={estilizarInputText(erros.resposta, 400, dados.cor_tema)} />
                        <MostrarMensagemErro mensagem={erros.resposta} />
                    </div>
                </>}
                
                <Divider className={estilizarDivider(dados.cor_tema)} />
                <h2 className={estilizarSubtitulo(dados.cor_tema)}>Configurações</h2>
                 <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel(dados.cor_tema)}>Cor do Tema:</label>
                    <Dropdown name="cor_tema" value={dados.cor_tema} options={opcoesCores} onChange={alterarEstado}
                         className={estilizarDropdown(erros.cor_tema, dados.cor_tema)} />
                </div>

                <div className="flex justify-content-center my-4">
                    {!ehConsulta && <Button label="Cadastrar" onClick={validarConfirmarCriacao} className={estilizarBotao(dados.cor_tema)} />}
                </div>

                <div className={estilizarFlex("center")}>
                    <Link to={ehConsulta ? "/pagina-inicial" : "/"} className={estilizarLink(dados.cor_tema)}>
                        {ehConsulta ? "Retornar para página inicial" : "Retornar para login"}
                    </Link>
                </div>
            </Card>
        </div>
    );
}