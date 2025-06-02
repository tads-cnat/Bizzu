import type { IBeeUsuario } from "../BeeFTPerfil/IBeeUsuario"

export interface Tag {
  label: string
  color: string
  tipo: "tec" | "mat" | "per" // Mantendo consistência com a interface principal
}

export interface BeePostProps {
  id?: number
  usuario: IBeeUsuario
  texto: string
  imagemPost?: string
  tags?: Tag[]
  dataPublicacao: string
  curtidas?: number
  comentarios?: number
  imagemUsuarioLogado?: string
  onCurtir: () => void
  onAbrirComentarios: () => void
  onExcluir?: (id: number) => void
}