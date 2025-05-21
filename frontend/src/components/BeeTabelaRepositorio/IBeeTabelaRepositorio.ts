export interface FileItem {
  id: string;
  name: string;
  daysAgo: number;
}

export interface IBeeTabelaRepositorio {
  /** Nome do usuário dono do repositório */
  userName: string;
  /** URL da imagem de perfil do usuário */
  userImage: string;
  /** Texto informando quando o repositório foi atualizado pela última vez */
  lastUpdated: string;
  /** Lista de tags associadas ao repositório */
  tags: string[];
  /** Lista de arquivos anexados ao repositório */
  files: FileItem[];
}
