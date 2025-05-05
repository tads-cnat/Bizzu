import { ReactNode } from "react";
import IBeeTags from "./components/BeeTags/IBeeTags";
// Para importar um componente ja existente em outro, se exporta o props do componente, referenciando o mesmo no props do seu componente

export interface CaixaRepositorioProps {
    // Tem que ter o export do usuário que postou o repositório
    usuarioIconeUrl?: string;
    usuarioNome?: string;
    dataPostagem: Date;
    tituloPostagem: string;
    descricaoPostagem: string;
    tags: IBeeTags[];
    onClick?: () => void;

}