import type React from "react"
import type { IconProps } from "@phosphor-icons/react"
import type { ChangeEvent } from "react"

export interface IBeeInput {
  // texto que vai ser exibido em cima do input
  label: string
  // texto que vai ficar dentro do input
  placeholder: string
  // tipo de entrada do input
  type?: string
  // Ícone caso necessário para usar no input
  icon?: React.ElementType<IconProps>
  // Valor do input
  value?: string
  // Função chamada quando o valor muda
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  // Nome do input
  name?: string
}
