// import {ReactNode} from "react";
import {ITag} from "../../interfaces/Repositorio";
// Para importar um componente ja existente em outro, se exporta o props do componente, referenciando o mesmo no props do seu componente

export interface CaixaRepositorioProps {
	// Tem que ter o export do usuário que postou o repositório
	usuarioIconeUrl?: string; // URL do avatar
	usuarioNome: string; // Nome do usuário
	dataPostagem: Date; // Data da postagem
	tituloPostagem: string; // Título da postagem
	descricaoPostagem: string; // Descrição da postagem
	tags: ITag[]; // Lista de tags
	onClick?: () => void; // Ação ao clicar (opcional)
	isOwner?: boolean; // Indica se o usuário é o proprietário do repositório
}
