import type { Usuario } from "../../interfaces/Repositorio";

export interface Tag {
  label: string
  color: string
  tipo: "tec" | "mat" | "per"
}

export interface BeeRepoProps {
  id?: number
  usuario: Usuario | null | undefined;
  titulo?: string
  descricao: string
  imagemRepo?: string
  tags?: Tag[]
  dataPublicacao: string
  imagemUsuarioLogado?: string
  onExcluir?: (id: number) => void
}