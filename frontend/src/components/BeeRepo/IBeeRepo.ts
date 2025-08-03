import type {IUsuario, ITag} from "../../interfaces/Repositorio";

export interface iTag {
	label: string;
	color: string;
	tipo: "tec" | "mat" | "per";
}

export interface iBeeRepoProps {
	id?: number;
	usuario: IUsuario; // Alterado de string para IUsuario
	titulo?: string;
	descricao: string;
	imagemRepo?: string;
	tags?: ITag[];
	dataPublicacao: string;
	imagemUsuarioLogado?: string;
	onExcluir?: (id: number) => void;
}
