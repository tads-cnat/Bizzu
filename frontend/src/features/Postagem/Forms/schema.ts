import * as yup from "yup";

const schema = yup.object().shape({
	texto: yup
		.string()
		.required("Conteúdo é obrigatório")
		.min(1, "Conteúdo não pode estar vazio")
		.max(200, "Conteúdo não pode ter mais de 200 caracteres"),
	imagem: yup.mixed().nullable().optional(),
	comunidade: yup.object().required("A comunidade é obrigatória"),
	categorias: yup
		.array()
		.of(yup.number())
		.min(1, "Selecione pelo menos uma categoria"),
});

export default schema;
