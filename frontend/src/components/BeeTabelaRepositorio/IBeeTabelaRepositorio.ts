import  { IUsuario } from "../../interfaces/Postagem";
import  IBeeTags from "../BeeTags/IBeeTags";
export interface FileItem {
  id: number
  nome?: string
  arquivo: string
  repositorio: number
}

export interface IBeeTabelaRepositorio {
  /** ID do repositório */
  id: number
  /** Título do repositório */
  titulo: string
  /** Descrição do repositório */
  descricao: string
  /** Objeto com informações do usuário dono do repositório */
  usuario: IUsuario | null
  /** Data de criação/atualização do repositório */
  dataPublicacao: string
  /** Lista de tags associadas ao repositório */
  tags: IBeeTags[]
  /** Lista de arquivos anexados ao repositório */
  arquivos: FileItem[]
  /** Imagem do repositório (opcional) */
  imagem?: string
}
