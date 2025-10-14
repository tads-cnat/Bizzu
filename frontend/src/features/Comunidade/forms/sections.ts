import {section} from "../../../components/BeeForm/IBeeForm";

const sections: section = {
    fields: [
        {
            name: "nome",
            type: "input",
            props: {
                name: "nome",
                label: "Nome",
                placeholder: "Digite o nome da comunidade...",
            },
        },
        {
            name: "descricao",
            type: "textarea",
            props: {
                name: "descricao",
                label: "Descrição",
                placeholder: "Digite a descrição da comunidade...",
                rows: 4,
            },
        },
        {
            name: "imagem",
            type: "perfil",
            props: {
                name: "imagem",
                label: "Selecione a foto",
                multiple: false,
            },
        },
        {
            name: "fundacao",
            type: "input",
            props: {
                name: "fundacao",
                label: "Ano de fundação",
                placeholder: "Digite o ano de fundação...",
            },
        },
        {
            name: "coodenacao",
            type: "input",
            props: {
                name: "coodenacao",
                label: "Coordenação do curso",
                placeholder: "Digite a coordenação do curso...",
            },
        },
        {
            name: "banner",
            type: "arquivo",
            props: {
                name: "banner",
                label: "Selecione o banner",
                multiple: false,
            },
        },
    ],
};
export default sections;
