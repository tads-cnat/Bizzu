export interface IBeeConfiguracoesCard {
  /** Função a ser chamada quando o usuário clicar no botão de editar perfil. */
  onEditarPerfil?: () => void

  /** Função a ser chamada para acionar a mudança de tema da aplicação (ex: claro/escuro). */
  onMudarTema?: () => void

  /** Função a ser chamada quando o usuário decidir editar sua lista de itens favoritos. */
  onEditarFavoritos?: () => void
}