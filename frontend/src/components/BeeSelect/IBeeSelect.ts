import { IconProps } from "@phosphor-icons/react";

interface Option{
    //O nome da opção, parte escrita 
    label: string;
    // O valor atribuido a cada opção 
    value: string | number;
}

export default interface IBeeSelect{
    //Icone que aparecerá dentro do campo 
    icon: React.ElementType<IconProps>;
    //O que estará ecrito dentro do campo 
    placeholder: string
    // O que estará dentro do select
    options: Option[]; 
}