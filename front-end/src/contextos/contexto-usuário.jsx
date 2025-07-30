import React, { createContext, useState } from "react";

const ContextoUsuario = createContext();

export default ContextoUsuario;

export function ProvedorUsuario({ children }) {
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [confirmacaoUsuario, setConfirmacaoUsuario] = useState(null);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false);

    return (
        <ContextoUsuario.Provider value={{
            usuarioLogado, setUsuarioLogado,
            confirmacaoUsuario, setConfirmacaoUsuario,
            mostrarModalConfirmacao, setMostrarModalConfirmacao
        }}>
            {children}
        </ContextoUsuario.Provider>
    );
}