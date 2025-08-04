import React from 'react';
import { createRoot } from "react-dom/client";
import { locale, addLocale } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./global.css";
import portugues from "./utilitarios/portugues.json";
import Rotas from "./rotas/rotas-aplicacao";
import { ProvedorUsuario } from './contextos/contexto-usuario';

addLocale("pt", portugues);
locale("pt");

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ProvedorUsuario>
      <Rotas />
    </ProvedorUsuario>
  </React.StrictMode>
);