export interface ICategoria {
	id: number;
	nome: string;
	tipo: "tec" | "mat" | "per";
}

export interface IBeeFiltroCategorias {
	categorias: ICategoria[];
	aoPesquisar: (termo: string) => void;
	//Valor default em caso de edição
	defaultValue?: any

	//Nome do campo
	name: string;

	//Control do useform
	control: any;
}
