import { Route, BrowserRouter, Routes } from "react-router-dom";
import RotasUsuarioLogado from "./rotas-usuário-logado"; // CORRIGIDO
import LogarUsuario from "../páginas/usuario/logar-usuario"; // CORRIGIDO
import CadastrarUsuario from "../páginas/usuario/cadastrar-usuario"; // CORRIGIDO
import PaginaInicial from "../páginas/usuario/pagina-inicial"; // CORRIGIDO
import CadastrarLiderBanda from "../páginas/lider-banda/cadastrar-lider-banda";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LogarUsuario />} path="/" />
        <Route element={<CadastrarUsuario />} path="criar-usuario" />
        <Route element={<RotasUsuarioLogado />}>
          <Route element={<PaginaInicial />} path="pagina-inicial" />
          <Route element={<CadastrarUsuario />} path="consultar-usuario" />
          <Route element={<CadastrarLiderBanda />} path="cadastrar-lider-banda" />
          <Route element={<CadastrarLiderBanda />} path="consultar-lider-banda" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};