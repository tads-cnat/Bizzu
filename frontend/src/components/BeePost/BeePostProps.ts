import { IBeeUsuario } from "../BeeFTPerfil/IBeeUsuario";

export interface Tag {
	label: string;
	color: string;
}

export interface BeePostProps {
  usuario: IBeeUsuario;
  texto: string;
  imagemPost?: string;
  tags: { label: string; color: string }[];
  dataPublicacao: string;
  curtidas: number;
  comentarios: number;
  imagemUsuarioLogado: string;
  onCurtir: () => void;
  onAbrirComentarios: () => void;
}
