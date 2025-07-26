// Interface para usuário
export interface IUsuario {
	id: number;
	nome: string;
	username: string;
	imagemPerfil?: string;
}

// Interface para postagem conforme retornada pelo backend
export interface IPostagem {
	id: number;
	texto: string;
	imagem?: string;
	dataPublicacao: string;
	usuario?: IUsuario | null;
	comunidade?: number | null;
	categorias: number[];
	curtidas?: number;
	comentarios?: number;
}

// Interface para valores do formulário de postagem
export interface IPostagemFormValues {
	texto: string;
	imagem?: File | null;
	comunidade?: {label: string; value: string | number} | undefined;
	categorias: number[];
	usuario: Number;
}

// Interface para tag - corrigida para ser mais específica
export interface ITag {
	label: string;
	color: string;
	tipo: "tec" | "mat" | "per"; // Removido o opcional para ser mais específico
}
