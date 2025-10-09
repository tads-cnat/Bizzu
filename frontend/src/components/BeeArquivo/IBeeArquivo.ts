export interface IBeeArquivo {
	// Nome do campo
	name: string;
	// O que vai aparecer ni botão
	label: string;
	// O vlaue é o arquivo que pode ser só um ou vários por isso os diferentes tipos
	value?: File | File[] | null;
	onChange?: (file: File | File[] | null) => void;
	error?: string;
	//Caso seja de postagem é false
	multiple?: boolean;
	// Control do use form
	control: any;
}
