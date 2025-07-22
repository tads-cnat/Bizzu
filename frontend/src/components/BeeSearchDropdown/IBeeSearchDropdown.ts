export interface IBeeSearchDropdown {
  // Lista de usuários encontrados na pesquisa
  usuarios: IUsuarioPesquisa[];
  // Se está carregando os resultados
  loading: boolean;
  // Se o dropdown está visível
  isVisible: boolean;
  // Função chamada quando um usuário é selecionado
  onSelectUser: (usuario: IUsuarioPesquisa) => void;
  // Função para fechar o dropdown
  onClose: () => void;
}

export interface IUsuarioPesquisa {
  id?: number;
  username: string;
  nome?: string;
  imagemPerfil?: string;
}