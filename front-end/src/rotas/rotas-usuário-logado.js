import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ContextoUsuario from "../contextos/contexto-usuário";
import MenuLateral from "../componentes/menu-lateral";
import servidor from "../serviços/servidor";

export default function RotasUsuarioLogado() {
    const { usuarioLogado } = useContext(ContextoUsuario);

    useEffect(() => {
        if (usuarioLogado?.token) {
            const interceptador = servidor.interceptors.request.use((request) => {
                request.headers.Authorization = `Bearer ${usuarioLogado.token}`;
                return request;
            });
            // Limpa o interceptador quando o componente é desmontado ou o token muda
            return () => servidor.interceptors.request.eject(interceptador);
        }
    }, [usuarioLogado?.token]);

    // Se o usuário tem um perfil, ele está logado e pode ver as páginas internas
    if (usuarioLogado?.perfil) {
        return <MenuLateral><Outlet /></MenuLateral>;
    } else {
        // Se não, ele é redirecionado para a página de login
        return <Navigate to="/" />;
    }
}