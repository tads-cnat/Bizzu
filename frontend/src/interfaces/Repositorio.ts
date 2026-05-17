// Interface para usuário
export interface IUsuario {
	nome: string;
	username: string;
	imagemPerfil?: string;
	id: number; // Adicionado id
}

// Interface para categoria
export interface ICategoria {
	id: number;
	nome: string;
	tipo: "tec" | "mat" | "per";
}

// Interface para repositorio conforme retornada pelo backend
export interface IRepositorio {
	id: number;
	titulo?: string;
	descricao: string;
	imagem?: string;
	dataPublicacao: string;
	usuario?: IUsuario | null;
	comunidade?: number | null;
	categorias: number[]; // Mudado para array de objetos categoria
	estaFavoritado?: boolean;
}

// Interface para valores do formulário de postagem
export interface IRepositorioFormValues {
	titulo: string;
	descricao: string;
	imagem?: File[] | File | null;
	comunidade?: {label: string; value: string | number} | undefined;
	categorias: number[];
	usuario: number;
}

// Interface para tag - corrigida para ser mais específica
export interface ITag {
	label: string;
	color: string;
	tipo: "tec" | "mat" | "per"; // Removido o opcional para ser mais específico
}
