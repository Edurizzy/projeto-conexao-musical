import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import ContextoUsuario from "../../contextos/contexto-usuario";
import { servicoCadastrarLiderBanda, servicoBuscarLiderBanda } from "../../serviços/serviços-líder-banda";
import mostrarToast from "../../utilitarios/mostrar-toast";
import { MostrarMensagemErro, validarCamposObrigatórios, checarListaVazia } from "../../utilitarios/validações";
import { estilizarBotao, estilizarCard, estilizarDivCampo, estilizarDropdown, estilizarInputText, estilizarLabel, estilizarFlex } from "../../utilitarios/estilos";

// ... (cole o resto da lógica do seu componente aqui)
export default function CadastrarLiderBanda() {
  const referenciaToast = useRef(null);
  const { usuarioLogado, setUsuarioLogado } = useContext(ContextoUsuario);
  const navegar = useNavigate();

  const [dados, setDados] = useState({ perfil_banda: "", genero_musical: "" });
  const [erros, setErros] = useState({});

  const opcoesPerfilBanda = [
      { label: "Autoral", value: "Autoral" },
      { label: "Cover", value: "Cover" },
      { label: "Tributo", value: "Tributo" }
  ];

  useEffect(() => {
    async function buscarDados() {
        if (usuarioLogado?.cadastrado) {
            try {
                const response = await servicoBuscarLiderBanda(usuarioLogado.cpf);
                setDados(response.data);
            } catch (error) {
                mostrarToast(referenciaToast, error.response?.data?.erro || "Erro ao buscar dados", "erro");
            }
        }
    }
    buscarDados();
  }, [usuarioLogado?.cadastrado, usuarioLogado?.cpf]);

  function alterarEstado(event) {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  }

  function validar() {
    const errosObrigatorios = validarCamposObrigatórios(dados);
    setErros(errosObrigatorios);
    return checarListaVazia(errosObrigatorios);
  }

  async function submeter() {
    if (validar()) {
      try {
        const response = await servicoCadastrarLiderBanda({ ...dados, usuario_info: usuarioLogado });
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
  
  const ehConsulta = !!usuarioLogado?.cadastrado;
  const tituloPagina = ehConsulta ? "Consultar Dados de Líder" : "Completar Cadastro: Líder de Banda";

  return (
    <div className={estilizarFlex("center")}>
      <Toast ref={referenciaToast} onHide={redirecionar} position="bottom-center" />
      <Card title={tituloPagina} className={estilizarCard(usuarioLogado.cor_tema)}>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Perfil da Banda*:</label>
          <Dropdown name="perfil_banda" value={dados.perfil_banda} options={opcoesPerfilBanda} onChange={alterarEstado} placeholder="-- Selecione --"
             className={estilizarDropdown(erros.perfil_banda, usuarioLogado.cor_tema)} disabled={ehConsulta} />
          <MostrarMensagemErro mensagem={erros.perfil_banda} />
        </div>
        <div className={estilizarDivCampo()}>
          <label className={estilizarLabel(usuarioLogado.cor_tema)}>Gênero Musical Principal*:</label>
          <InputText name="genero_musical" value={dados.genero_musical} onChange={alterarEstado} 
            className={estilizarInputText(erros.genero_musical, 400, usuarioLogado.cor_tema)} disabled={ehConsulta}/>
          <MostrarMensagemErro mensagem={erros.genero_musical} />
        </div>
        <div className="flex justify-content-center mt-4">
            {!ehConsulta && <Button label="Salvar e Finalizar" className={estilizarBotao()} onClick={submeter} />}
            {ehConsulta && <Button label="Retornar" className={estilizarBotao()} onClick={() => navegar('/pagina-inicial')} />}
        </div>
      </Card>
    </div>
  );
}