back-end/
├── src/
│   ├── entidades/
│   │   ├── usuario.ts
│   │   ├── lider-banda.ts (Proponente)
│   │   ├── musico.ts (Interessado)
│   │   ├── vaga.ts (Proposta)
│   │   └── inscricao.ts (Interesse)
│   ├── middlewares/
│   │   ├── verificar-token.ts
│   │   ├── verificar-perfil-lider-banda.ts
│   │   └── verificar-perfil-musico.ts (Novo)
│   ├── rotas/
│   │   ├── rotas-usuario.ts
│   │   ├── rotas-lider-banda.ts
│   │   └── rotas-musico.ts (Novo)
│   ├── serviços/
│   │   ├── serviços-usuario.ts
│   │   ├── serviços-lider-banda.ts
│   │   └── serviços-musico.ts (Novo)
│   └── servidor.ts
├── .env
├── .env.example
├── ormconfig.ts
├── package.json
└── tsconfig.json


front-end/
├── public/
│   └── index.html
└── src/
    ├── componentes/
    │   ├── menu-lateral.jsx
    │   └── modais/
    │       └── modal-confirmacao-usuario.jsx
    ├── contextos/
    │   └── contexto-usuario.jsx
    ├── páginas/
    │   ├── lider-banda/ (Proponente)
    │   │   └── cadastrar-lider-banda.jsx
    │   ├── musico/ (Interessado - Novo)
    │   │   └── cadastrar-musico.jsx
    │   └── usuario/
    │       ├── cadastrar-usuario.jsx
    │       ├── logar-usuario.jsx
    │       └── pagina-inicial.jsx
    ├── rotas/
    │   ├── rotas-aplicacao.js
    │   └── rotas-usuario-logado.js
    ├── serviços/
    │   ├── servidor.js
    │   ├── servicos-usuario.js
    │   ├── servicos-lider-banda.js
    │   └── servicos-musico.js (Novo)
    ├── utilitarios/
    │   ├── estilos.js
    │   ├── formatar-perfil.js
    │   ├── mascaras.js
    │   ├── mostrar-toast.js
    │   ├── portugues.json
    │   └── validacoes.js
    ├── global.css
    └── index.js
