// Interface para usuário
export interface IUsuario {
	nome: string;
	username: string;
	imagemPerfil?: string;
	id: number; // Adicionado id
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
	categorias: number[];
}

// Interface para valores do formulário de postagem
export interface IRepositorioFormValues {
	titulo: string;
	descricao: string;
	imagem?: File[] | File | null;
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
