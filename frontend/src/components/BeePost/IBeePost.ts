import IBeeTags from "../BeeTags/IBeeTags";
import type { IUsuario } from "../../interfaces/Postagem"

export interface BeePostProps {
  id?: number
  usuario: IUsuario;
  texto: string
  imagemPost?: string
  tags?: IBeeTags[]
  dataPublicacao: string
  curtidas?: number
  comentarios?: number
  imagemUsuarioLogado?: string
  onCurtir: () => void
  onAbrirComentarios: () => void
  onExcluir?: (id: number) => void
  disableInteractions?: boolean
  comunidade?: string;
}