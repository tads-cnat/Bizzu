export interface Tag {
	label: string;
	color: string;
}

export interface BeePostProps {
	nome: string;
	imagemPerfil: string;
	tempoPostado: string;
	conteudo: string;
	imagemPost?: string;
	tags: Tag[];
	curtidas: number;
	comentarios: number;
    imagemUsuarioLogado: string;
}
