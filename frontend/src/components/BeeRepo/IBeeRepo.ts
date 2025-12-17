import type {IUsuario} from "../../interfaces/Repositorio";
import IBeeTags from "../BeeTags/IBeeTags";

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
	tags?: IBeeTags[];
	dataPublicacao: string;
	imagemUsuarioLogado?: string;
	onExcluir?: (id: number) => void;
}
