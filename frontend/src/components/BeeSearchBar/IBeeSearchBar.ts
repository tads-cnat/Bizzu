import type { IUsuarioPesquisa } from "../BeeSearchDropdown/IBeeSearchDropdown";

export interface IBeeSearchBar {
	// Função chamada quando o usuário realiza uma busca.
	// Recebe como parâmetro o termo digitado na barra de busca(string).
	onSearch: (termo: string) => void;
	
	// Se deve mostrar o dropdown de pesquisa de usuários
	showUserSearch?: boolean;
	// Função chamada quando um usuário é selecionado no dropdown
	onSelectUser?: (usuario: IUsuarioPesquisa) => void;
	// Placeholder customizado
	placeholder?: string;
}