export interface IBeeCategoria {
	//Mensagem de erro
	errors: string;

	//Observar mudança de valor no campo dentro do formulário
	watch: any;

	//Valor default em casos de edição
	defaultValue?: any;

	//Nome do campo
	name: string;

	//Control do useForm
	control: any;
}
