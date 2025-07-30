export const TEMA_PADRAO = "bluegray";

export const opcoesCores = [
    { label: "Amarelo", value: "yellow" }, { label: "Anil", value: "indigo" },
    { label: "Azul", value: "blue" }, { label: "Azul Piscina", value: "cyan" },
    { label: "Cinza Escuro", value: "bluegray" }, { label: "Laranja", value: "orange" },
    { label: "Rosa", value: "pink" }, { label: "Roxo", value: "purple" },
    { label: "Verde", value: "green" }, { label: "Verde Azulado", value: "teal" }
];

export function estilizarPaginaUnica() {
    return "flex flex-column align-items-center justify-content-center h-screen";
}

export function estilizarLogo() {
    return `text-center text-4xl mb-6 text-${TEMA_PADRAO}-700`;
}

export function estilizarCard(cor_tema = TEMA_PADRAO) {
    return `w-full md:w-8 lg:w-6 p-4 text-${cor_tema}-700 border-2 shadow-8`;
}

export function estilizarDivCampo() {
    return "mb-3 flex flex-column";
}

export function estilizarLabel(cor_tema = TEMA_PADRAO) {
    return `w-auto text-md mb-2 text-${cor_tema}-700 font-bold`;
}

function aplicarBorda(erro, cor_tema = TEMA_PADRAO) {
    return erro ? "p-invalid" : `border-${cor_tema}-800`;
}

export function estilizarInputText(erro, largura = 400, cor_tema = TEMA_PADRAO) {
    return `p-inputtext-sm w-${largura}px ${aplicarBorda(erro, cor_tema)}`;
}

export function estilizarInputMask(erro, cor_tema = TEMA_PADRAO) {
    return `p-inputtext-sm w-auto ${aplicarBorda(erro, cor_tema)}`;
}

export function estilizarPasswordInput(erro, cor_tema = TEMA_PADRAO) {
    return `p-inputtext-sm ${aplicarBorda(erro, cor_tema)}`;
}

export function estilizarDropdown(erro, cor_tema = TEMA_PADRAO) {
    return `p-inputtext-sm w-auto ${aplicarBorda(erro, cor_tema)}`;
}

export function estilizarBotao(cor_tema = TEMA_PADRAO) {
    return `p-button-sm h-2rem text-base w-auto md:w-min mr-2 bg-${cor_tema}-600 border-${cor_tema}-800 shadow-6`;
}

export function estilizarBotaoRemover() {
    return `p-button-sm h-2rem text-base w-auto md:w-min mr-2 p-button-danger border-red-800 shadow-6`;
}

export function estilizarLink(cor_tema = TEMA_PADRAO) {
    return `font-bold text-md mt-4 text-${cor_tema}-800`;
}

export function estilizarFlex(alinhamento = "start") {
    return `flex flex-column align-items-${alinhamento}`;
}

export function estilizarInlineFlex() {
    return "flex flex-row align-items-center mt-4 justify-content-center";
}

export function estilizarErro() {
    return "p-error text-xs font-bold mt-1";
}

export function estilizarDialog() {
    return "w-full md:w-6 lg:w-4 p-2";
}

export function estilizarModal() {
    return "flex flex-column p-3";
}

export function estilizarDivider(cor_tema = TEMA_PADRAO) {
    return `my-4 border-1 border-${cor_tema}-200`;
}

export function estilizarSubtitulo(cor_tema = TEMA_PADRAO) {
    return `text-xl font-bold text-${cor_tema}-600`;
}

export function estilizarMenuLateralDesktop(cor_tema = TEMA_PADRAO) {
    return `p-4 flex flex-column align-items-center h-screen fixed surface-50 bg-${cor_tema}-100 text-${cor_tema}-800`;
}

export function estilizarTitulo(cor_tema = TEMA_PADRAO) {
    return `text-2xl font-bold align-self-start text-${cor_tema}-800`;
}

export function estilizarMenu() {
    return "w-full mt-4";
}

export function estilizarCardHeaderCentralizado() {
    return "flex justify-content-center font-bold text-2xl mb-4";
}