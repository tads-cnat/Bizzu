export interface IComentario {
	id: number;
	conteudo: string;
	dataPostagem: string;
	usuario: {
		id: number;
		username: string;
		nome: string;
		imagemPerfil?: string;
	};
	postagem: number;
}

export interface IComentariosResponse {
	comentarios: IComentario[];
	total: number;
}
