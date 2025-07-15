import { IconProps } from "@phosphor-icons/react";
import { UseFormRegisterReturn } from "react-hook-form";
 
 
 export  interface IBeeInputPerfil {
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

    // As props abaixos estão sendo utilizadas especificamente no formulário de editar perfil
    // função para atualizar valor ao digitar
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    // Função responsável por
    // id do campo que vai ser modificado
    id?: any;
    // valor atual do input
    value?: string; 
    // nome do campo para identificação
    name?: string;
    
 }
