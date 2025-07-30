import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import ContextoUsuario from "../contextos/contexto-usuário";
import formatarPerfil from "../utilitarios/formatar-perfil";
import { estilizarMenu, estilizarMenuLateralDesktop, estilizarSubtitulo, estilizarTitulo } from "../utilitarios/estilos";

export default function MenuLateral({ children }) {
    const { usuarioLogado, setUsuarioLogado } = useContext(ContextoUsuario);
    const navegar = useNavigate();

    function sairSistema() {
        setUsuarioLogado(null);
        navegar("/");
    }

    // ADAPTAÇÃO PARA O TEMA "CONEXÃO MUSICAL"
    const opcoesMusicoLider = [
        { label: "Página Inicial", command: () => navegar("/pagina-inicial") },
        {
            label: "Menu",
            items: [
                { label: "Consultar meus Dados", command: () => navegar("/consultar-usuario") },
                { label: "Consultar Dados de Líder", command: () => navegar("/consultar-musico-lider") },
            ]
        },
        { label: "Sair do Sistema", command: () => sairSistema() }
    ];

    const opcoesMusicoCandidato = [
        { label: "Página Inicial", command: () => navegar("/pagina-inicial") },
        {
            label: "Menu",
            items: [
                { label: "Consultar meus Dados", command: () => navegar("/consultar-usuario") },
            ]
        },
        { label: "Sair do Sistema", command: () => sairSistema() }
    ];

    function opcoesMenu() {
        switch (usuarioLogado.perfil) {
            case "musico_lider":
                return opcoesMusicoLider;
            case "musico_candidato":
                return opcoesMusicoCandidato;
            default:
                return [];
        }
    }

    return (
        <div className="grid">
            <div className="col-fixed" style={{ width: '250px' }}>
                <div className={estilizarMenuLateralDesktop(usuarioLogado?.cor_tema)}>
                    <h1 className={estilizarTitulo(usuarioLogado?.cor_tema)}>{usuarioLogado?.nome}</h1>
                    <h2 className={estilizarSubtitulo(usuarioLogado?.cor_tema)}>
                        {formatarPerfil(usuarioLogado?.perfil)}
                    </h2>
                    <Menu model={opcoesMenu()} className={estilizarMenu()} />
                </div>
            </div>
            <div className="col">
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}