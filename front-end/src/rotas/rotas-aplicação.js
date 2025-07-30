import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuarioLogado from "./rotas-usuário-logado";
import LogarUsuario from "../páginas/usuario/logar-usuário";
import CadastrarUsuario from "../páginas/usuario/cadastrar-usuário";
import PaginaInicial from "../páginas/usuario/página-inicial";
import CadastrarMusicoLider from "../páginas/musico-lider/cadastrar-musico-lider";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LogarUsuario />} path="/" />
        <Route element={<CadastrarUsuario />} path="criar-usuario" />
        <Route element={<RotasUsuarioLogado />}>
          <Route element={<PaginaInicial />} path="pagina-inicial" />
          <Route element={<CadastrarUsuario />} path="consultar-usuario" />
          <Route element={<CadastrarMusicoLider />} path="cadastrar-musico-lider" />
          <Route element={<CadastrarMusicoLider />} path="consultar-musico-lider" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};