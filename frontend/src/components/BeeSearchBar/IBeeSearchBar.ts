export interface IBeeSearchBar {
	// Função chamada quando o usuário realiza uma busca.
	//Recebe como parâmetro o termo digitado na barra de busca(string).
	// Função chamada quando o usuário realiza uma busca.
	//Recebe como parâmetro o termo digitado na barra de busca(string).
	onSearch: (termo: string) => void;
}