export interface Tag {
	label: string;
	color: string;
}

export interface BeePostProps {
  usuario: {
    name: string;
    date: Date;
    image?: string;
  };
  conteudo: string;
  imagemPost?: string;
  tags: { label: string; color: string }[];
  curtidas: number;
  comentarios: number;
  imagemUsuarioLogado: string;
  onCurtir: () => void;
  onAbrirComentarios: () => void;
}
