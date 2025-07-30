import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuario from "../../contextos/contexto-usuário";
import { servicoCadastrarMusicoLider } from "../../serviços/serviços-musico-lider";
import mostrarToast from "../../utilitarios/mostrar-toast";
import { MostrarMensagemErro, validarCamposObrigatorios, checarListaVazia } from "../../utilitários/validações";
import { estilizarBotao, estilizarCard, estilizarDivCampo, estilizarInputText, estilizarLabel, estilizarFlex } from "../../utilitários/estilos";

export default function CadastrarMusicoLider() {
  const referenciaToast = useRef(null);
  const { usuarioLogado, setUsuarioLogado } = useContext(ContextoUsuario);
  const navegar = useNavigate();

  const [dados, setDados] = useState({ nome_banda: "", genero_musical: "" });
  const [erros, setErros] = useState({});

  function alterarEstado(event) {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  }

  function validarCampos() {
    const errosObrigatorios = validarCamposObrigatorios(dados);
    setErros(errosObrigatorios);
    return checarListaVazia(errosObrigatorios);
  }

  async function cadastrar() {
    if (validarCampos()) {
      try {
        const response = await servicoCadastrarMusicoLider({
          ...dados,
          usuario_info: usuarioLogado,
        });
        if (response.data) {
          setUsuarioLogado(usuario => ({ ...usuario, status: response.data.status, token: response.data.token, cadastrado: true }));
          mostrarToast(referenciaToast, "Dados de líder cadastrados com sucesso!", "sucesso");
        }
      } catch (error) {
        mostrarToast(referenciaToast, error.response?.data?.erro || "Erro no servidor", "erro");
      }
    }
  }
  
  function redirecionar() {
      if(usuarioLogado.cadastrado){
        navegar("/pagina-inicial");
      }
  }
  
  function tituloFormulario() {
      if (usuarioLogado?.cadastrado) return "Consultar Dados de Líder";
      else return "Completar Cadastro: Músico Líder";
  }


  return (
    <div className={estilizarFlex("center")}>
      <Toast ref={referenciaToast} onHide={redirecionar} position="bottom-center" />
      <Card title={tituloFormulario()} className={estilizarCard(usuarioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Nome da Banda/Projeto*:</label>
          <InputText name="nome_banda" value={dados.nome_banda} onChange={alterarEstado} className={estilizarInputText(erros.nome_banda, 400, usuarioLogado.cor_tema)} disabled={usuarioLogado?.cadastrado} />
          <MostrarMensagemErro mensagem={erros.nome_banda} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Gênero Musical Principal*:</label>
          <InputText name="genero_musical" value={dados.genero_musical} onChange={alterarEstado} className={estilizarInputText(erros.genero_musical, 400, usuarioLogado.cor_tema)} disabled={usuarioLogado?.cadastrado}/>
          <MostrarMensagemErro mensagem={erros.genero_musical} />
        </div>
        <div className="flex justify-content-center mt-4">
            {!usuarioLogado?.cadastrado && <Button label="Salvar e Finalizar" className={estilizarBotao()} onClick={cadastrar} />}
            {usuarioLogado?.cadastrado && <Button label="Retornar" className={estilizarBotao()} onClick={() => navegar('/pagina-inicial')} />}
        </div>
      </Card>
    </div>
  );
}