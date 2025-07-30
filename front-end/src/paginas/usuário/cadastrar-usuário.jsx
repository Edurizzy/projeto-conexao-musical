// ... importações ...

export default function CadastrarUsuario() {
  // ... hooks (useRef, useContext, useState, etc) ...

  const opcoesPerfis = [
    { label: "Músico Líder", value: "musico_lider" },
    { label: "Músico Candidato", value: "musico_candidato" },
  ];

  // ... outras funções ...
}

// Dentro do componente ModalConfirmacaoUsuario (arquivo separado ou na mesma lógica),
// a função que finaliza o cadastro deve ser adaptada:
function finalizarCadastro() {
  if (dados.perfil === "musico_lider") {
    // ...
    navegar("../cadastrar-musico-lider"); // Navega para a rota correta
  }
  // Lógica para musico_candidato virá em outra etapa
}