export default function formatarPerfil(perfil) {
    switch (perfil) {
        case "LíderBanda": return "Líder de Banda";
        case "Músico": return "Músico";
        default: return "Perfil";
    }
}