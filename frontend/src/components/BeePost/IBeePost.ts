import IBeeTags from "../BeeTags/IBeeTags";

export interface BeePostProps {
  id?: number
  usuario: string;
  texto: string
  imagemPost?: string
  tags?: IBeeTags[]
  dataPublicacao: string
  curtidas?: number
  comentarios?: number
  imagemUsuarioLogado?: string
  categorias?: number[] 
  onCurtir: () => void
  onAbrirComentarios: () => void
  onExcluir?: (id: number) => void
  disableInteractions?: boolean
}