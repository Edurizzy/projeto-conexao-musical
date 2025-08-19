import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ContextoUsuario from "../contextos/contexto-usuario";
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
            return () => servidor.interceptors.request.eject(interceptador);
        }
    }, [usuarioLogado?.token]);

    if (usuarioLogado?.perfil) {
        return <MenuLateral><Outlet /></MenuLateral>;
    } else {
        return <Navigate to="/" />;
    }
}