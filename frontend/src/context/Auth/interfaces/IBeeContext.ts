export interface IBeeContext {
  // Função que vai autenticar usuário
  autenticar: (username: string, password: string) => Promise<void>
  // Função que vai ser usada para deslogar usuário
  deslogar: () => void
  // ID do usuário (pode ser undefined se não estiver logado)
  id?: number
  // Username do usuário
  username?: string
  // Token de autenticação
  token?: string
}
