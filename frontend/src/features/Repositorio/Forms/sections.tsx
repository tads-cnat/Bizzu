import {Hexagon} from "@phosphor-icons/react";
import {section} from "../../../components/BeeForm/IBeeForm";

const sections: section = {
	fields: [
		{
			name: "comunidade",
			type: "select",
			props: {
				name: "comunidade",
				placeholder: "Selecione uma comunidade",
				icone: {Hexagon},
			},
		},
		{
			name: "titulo",
			type: "input",
			props: {
				name: "titulo",
				label: "Título",
				placeholder: "Digite o título do seu repositório...",
				rows: 4,
			},
		},
		{
			name: "descricao",
			type: "textarea",
			props: {
				name: "comunidade",
				label: "Descrição",
				placeholder: "Digite a descrição do seu repositório...",
				rows: 4,
			},
		},
		{
			name: "arquivos",
			type: "arquivo",
			props: {
				name: "arquivos",
				label: "Selecione os arquivos",
				multiple: true,
			},
		},
		{
			name: "categoria",
			type: "categorias",
			props: {},
		},
	],
};
export default sections;
