type colors = "magenta" | "orange" | "cyan"

export default interface IBeeTags {
  // Texto para ser exibido na tag
  label: string
  // Cor da tag que se altera dependendo de onde ela é inserida
  color: colors
}
