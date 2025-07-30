import React, { useContext } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import ContextoUsuario from "../../contextos/contexto-usuário";
import imagemComputacao from "../../imagens/imagem-computação.jpg"; // Você precisará adicionar uma imagem na pasta 'imagens'
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
            <Card header={Header} className={estilizarCard(usuarioLogado.cor_tema)}>
                <Image src={imagemComputacao} alt="Imagem da plataforma" width="800" />
            </Card>
        </div>
    );
}