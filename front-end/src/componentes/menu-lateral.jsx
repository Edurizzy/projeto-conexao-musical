import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import ContextoUsuario from "../contextos/contexto-usuario";
import formatarPerfil from "../utilitarios/formatar-perfil";
import { estilizarMenu, estilizarMenuLateralDesktop, estilizarSubtituloMenu, estilizarTituloMenu } from "../utilitarios/estilos";

export default function MenuLateral({ children }) {
    const { usuarioLogado, setUsuarioLogado } = useContext(ContextoUsuario);
    const navegar = useNavigate();

    function sairSistema() {
        setUsuarioLogado(null);
        navegar("/");
    }

    const opcoesLiderBanda = [
        { label: "Página Inicial", command: () => navegar("/pagina-inicial") },
        {
            label: "Menu",
            items: [
                { label: "Consultar meus Dados", command: () => navegar("/consultar-usuario") },
                { label: "Consultar Dados de Líder", command: () => navegar("/consultar-lider-banda") },
            ]
        },
        { label: "Sair do Sistema", command: () => sairSistema() }
    ];

    const opcoesMusico = [
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
            case "lider_banda": return opcoesLiderBanda;
            case "musico": return opcoesMusico;
            default: return [];
        }
    }

    return (
        <div className="grid grid-nogutter">
            <div className="col-fixed" style={{ width: '280px' }}>
                <div className={estilizarMenuLateralDesktop(usuarioLogado?.cor_tema)}>
                    <h1 className={estilizarTituloMenu(usuarioLogado?.cor_tema)}>{usuarioLogado?.nome}</h1>
                    <h2 className={estilizarSubtituloMenu(usuarioLogado?.cor_tema)}>
                        {formatarPerfil(usuarioLogado?.perfil)}
                    </h2>
                    <Menu model={opcoesMenu()} className={estilizarMenu()} />
                </div>
            </div>
            <div className="col">
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
}