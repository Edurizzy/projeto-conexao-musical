import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import ContextoUsuario from "../../contextos/contexto-usuario"; // CORRIGIDO
import { servicoLogarUsuario } from "../../serviços/serviços-usuário"; // CORRIGIDO
import mostrarToast from "../../utilitarios/mostrar-toast";
import { CPF_MASCARA } from "../../utilitarios/máscaras"; // CORRIGIDO
import { MostrarMensagemErro, validarCamposObrigatórios, checarListaVazia } from "../../utilitarios/validações"; // CORRIGIDO
import { estilizarBotao, estilizarCard, estilizarDivCampo, estilizarFlex, estilizarInputMask, estilizarLabel, estilizarLink, estilizarLogo, estilizarPasswordInput, estilizarPaginaUnica } from "../../utilitarios/estilos";

// ... (cole o resto da lógica do seu componente aqui)
export default function LogarUsuario() {
    const referenciaToast = useRef(null);
    const { setUsuarioLogado } = useContext(ContextoUsuario);
    const navegar = useNavigate();
    const [dados, setDados] = useState({ nome_login: "", senha: "" });
    const [erros, setErros] = useState({});

    function alterarEstado(event) {
        const { name, value } = event.target;
        setDados({ ...dados, [name]: value });
    }

    function validarCampos() {
        const errosObrigatorios = validarCamposObrigatórios(dados);
        setErros(errosObrigatorios);
        return checarListaVazia(errosObrigatorios);
    }

    async function logar() {
        if (validarCampos()) {
            try {
                const response = await servicoLogarUsuario(dados);
                setUsuarioLogado({ ...response.data.usuarioLogado, cpf: dados.nome_login, cadastrado: true });
                navegar("/pagina-inicial");
            } catch (error) {
                mostrarToast(referenciaToast, error.response?.data?.erro || "Erro no servidor", "erro");
            }
        }
    }

    return (
        <div className={estilizarPaginaUnica()}>
            <Toast ref={referenciaToast} position="bottom-center" />
            <h1 className={estilizarLogo()}>Conexão Musical</h1>
            <Card title="Login" className={estilizarCard()}>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel()}>Usuário (CPF)</label>
                    <InputMask name="nome_login" mask={CPF_MASCARA} value={dados.nome_login} onChange={alterarEstado}
                        className={estilizarInputMask(erros.nome_login)} />
                    <MostrarMensagemErro mensagem={erros.nome_login} />
                </div>
                <div className={estilizarDivCampo()}>
                    <label className={estilizarLabel()}>Senha</label>
                    <Password name="senha" value={dados.senha} onChange={alterarEstado} toggleMask feedback={false}
                        className={estilizarPasswordInput(erros.senha)} />
                    <MostrarMensagemErro mensagem={erros.senha} />
                </div>
                <div className={estilizarFlex("center")}>
                    <Button label="Login" onClick={logar} className={estilizarBotao()} />
                    <Link to="/" className={estilizarLink()}>Recuperar Acesso de Usuário</Link>
                    <Link to="/criar-usuario" className={estilizarLink()}>Cadastrar Usuário</Link>
                </div>
            </Card>
        </div>
    );
}