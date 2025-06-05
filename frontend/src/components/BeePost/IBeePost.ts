import type { IBeeUser } from "../BeeHeaderProfile/IBeeUser"

export interface Tag {
  label: string
  color: string
  tipo: "tec" | "mat" | "per" // Mantendo consistência com a interface principal
}

export interface BeePostProps {
  id?: number
  usuario: IBeeUser
  texto: string
  imagemPost?: string
  tags?: Tag[]
  dataPublicacao: string
  curtidas?: number
  comentarios?: number
  imagemUsuarioLogado?: string
  onAbrirComentarios: () => void
  onExcluir?: (id: number) => void
}