import { IconProps } from "@phosphor-icons/react";
import { UseFormRegisterReturn } from "react-hook-form";
 
 
 export  interface IBeeInput {
     // texto que vai ser exibido em cima do input
     label: string;
     // texto que vai ficar dentro do input
     placeholder: string; 
     // tipo de entrada do input
     type?: string; 
     // Ícone caso necessário para usar no input
     icon?: React.ElementType<IconProps>;
    // Para registrar formulário
    register?: UseFormRegisterReturn;
 }
