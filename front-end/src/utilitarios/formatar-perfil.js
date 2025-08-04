export default function formatarPerfil(perfil) {
    switch (perfil) {
        case "lider_banda": return "Líder de Banda";
        case "musico": return "Músico";
        default: return "Perfil";
    }
}