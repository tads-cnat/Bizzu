export interface Tag {
  label: string
  color: string
  tipo: "tec" | "mat" | "per"
}

export interface BeeRepoProps {
  id?: number
  usuario: String;
  descricao: string
  imagemRepo?: string
  tags?: Tag[]
  dataPublicacao: string
  imagemUsuarioLogado?: string
  onExcluir?: (id: number) => void
}