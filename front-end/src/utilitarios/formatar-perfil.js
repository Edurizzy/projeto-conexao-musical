export default function formatarPerfil(perfil) {
    switch (perfil) {
        case "musico_lider":
            return "Músico Líder";
        case "musico_candidato":
            return "Músico Candidato";
        default:
            return "Perfil Desconhecido";
    }
}