import type React from "react";
import type { IconProps } from "@phosphor-icons/react";

interface Option {
  //O nome da opção, parte escrita
  label: string;
  // O valor atribuido a cada opção
  value: string | number;
}

export default interface IBeeSelect {
  //Icone que aparecerá dentro do campo
  icone: React.ElementType<IconProps>;
  //O que estará ecrito dentro do campo
  placeholder: string;
  // O que estará dentro do select
  options: Option[];
  // Valor selecionado
  value?: Option;
  // Função chamada quando o valor muda
  onChange?: (value: Option) => void
  // Mensagem de erro
  error?: string
  // Control do useform
  control: any;
  // Valor default quando é caso de edição
  defaultValue: Option;
  // Nome do campo
  name: string;
// eslint-disable-next-line semi
};
