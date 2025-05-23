import { IBeeUsuario } from "../BeeFTPerfil/IBeeUsuario";

export interface FileItem {
  id: string;
  name: string;
  daysAgo: number;
}

export interface IBeeTabelaRepositorio {
  /** Objeto com informações do usuário dono do repositório */
  usuario: IBeeUsuario;
  /** Texto informando quando o repositório foi atualizado pela última vez */
  lastUpdated: string;
  /** Lista de tags associadas ao repositório */
  tags: { label: string; color: string }[];
  /** Lista de arquivos anexados ao repositório */
  files: FileItem[];
}
