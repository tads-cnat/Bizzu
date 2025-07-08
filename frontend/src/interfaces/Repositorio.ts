// Interface para usuário
export interface Usuario {
	nome: string;
	username: string;
	imagemPerfil?: string;
}

// Interface para repositorio conforme retornada pelo backend
export interface Repositorio {
	id: number;
	titulo?: string;
	descricao: string;
	imagem?: string;
	dataPublicacao: string;
	usuario?: Usuario | null;
	comunidade?: number | null;
	categorias: number[];
}

// Interface para valores do formulário de postagem
export interface RepositorioFormValues {
	titulo: string;
	descricao: string;
	imagem?: File[] | File | null;
	comunidade?: {label: string; value: string | number} | undefined;
	categorias: number[];
	usuario: Number;
}

// Interface para tag - corrigida para ser mais específica
export interface Tag {
	label: string;
	color: string;
	tipo: "tec" | "mat" | "per"; // Removido o opcional para ser mais específico
}
