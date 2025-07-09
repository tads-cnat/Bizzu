import type { Usuario } from "../../interfaces/Repositorio"

export interface FileItem {
  id: number
  name: string
  arquivo: string
  uploadedAt: string
}

export interface IBeeTabelaRepositorio {
  /** ID do repositório */
  id: number
  /** Título do repositório */
  titulo: string
  /** Descrição do repositório */
  descricao: string
  /** Objeto com informações do usuário dono do repositório */
  usuario: Usuario | null
  /** Data de criação/atualização do repositório */
  dataPublicacao: string
  /** Lista de tags associadas ao repositório */
  tags: { label: string; color: string; tipo: "tec" | "mat" | "per" }[]
  /** Lista de arquivos anexados ao repositório */
  files: FileItem[]
  /** Imagem do repositório (opcional) */
  imagem?: string
}
