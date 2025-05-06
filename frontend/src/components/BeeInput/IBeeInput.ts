import { Icon } from "phosphor-react";

export default interface IBeeInput {
    label: string; // texto que vai ser exibido em cima do input
    placeholder: string; // texto que vai ficar dentro do input
    type?: string; // tipo de entrada do input
    icon?: Icon; // Ícone caso necessário para usar no input
}



