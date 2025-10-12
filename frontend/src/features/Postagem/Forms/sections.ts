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
			name: "texto",
			type: "textarea",
			props: {
				name: "texto",
				label: "Conteúdo da Postagem",
				placeholder: "Digite o conteúdo da sua postagem...",
				rows: 4,
			},
		},
		{
			name: "imagem",
			type: "arquivo",
			props: {
				name: "imagem",
				label: "Selecione os anexos",
				multiple: false,
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
