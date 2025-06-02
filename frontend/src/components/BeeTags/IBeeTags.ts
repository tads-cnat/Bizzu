export default interface IBeeTags {
  // Texto para ser exibido na tag
  label: string
  // Cor da tag que se altera dependendo de onde ela é inserida
  color: string
  // Tipo da categoria (opcional)
  tipo?: "tec" | "mat" | "per"
  // Função opcional para clique na tag
  onClick?: () => void
  // Se a tag está selecionada (para filtros)
  isSelected?: boolean
}
