import { IconProps } from "@phosphor-icons/react";

export interface IBeeAnexos{
    // String responsável por pegar a "url" do arquivo
    path: string;
    // Icone de "X"
    icon?: React.ElementType<IconProps>;
    
    }