import React, { useContext } from "react";
import { Card } from "primereact/card";
import ContextoUsuario from "../../contextos/contexto-usuario";
import { estilizarCard, estilizarCardHeaderCentralizado } from "../../utilitarios/estilos";

export default function PaginaInicial() {
    const { usuarioLogado } = useContext(ContextoUsuario);

    const Header = () => (
        <div className={estilizarCardHeaderCentralizado()}>
            Plataforma Conexão Musical
        </div>
    );

    return (
        <div className="flex justify-content-center align-items-center">
            <Card header={Header} className={estilizarCard(usuarioLogado?.cor_tema)}>
                <div className="text-center p-5">
                    <h2>Bem-vindo(a) à plataforma!</h2>
                    <p>Use o menu à esquerda para navegar pelas funcionalidades.</p>
                </div>
            </Card>
        </div>
    );
}