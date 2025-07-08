import type React from "react"
export interface ICategoria {
  id: number
  nome: string
  tipo: "tec" | "mat" | "per"
}

export interface IBeeDropdown {
  // Placeholder que aparece no dropdown quando nenhuma categoria está selecionada
  placeholder?: string
  // Callback executado quando uma categoria é selecionada
  onSelect: (categoria: ICategoria) => void
  // Se o dropdown deve estar desabilitado
  disabled?: boolean
  // Categoria atualmente selecionada (opcional, para controle externo)
  selectedCategory?: ICategoria | null
  // Estilo customizado (opcional)
  style?: React.CSSProperties
  // Classe CSS customizada (opcional)
  className?: string
}
