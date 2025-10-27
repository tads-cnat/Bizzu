import {section} from "../../../components/BeeForm/IBeeForm";

const sections: section = {
    fields: [
        {
            name: "imagemPerfil",
            type: "perfil",
            props: {
                name: "imagemPerfil",
                label: "Selecione uma foto",
                multiple: false,
            },
        },
        {
            name: "nome",
            type: "input",
            props: {
                name: "nome",
                label: "Nome",
                placeholder: "Digite seu nome...",
            },
        },
        {
            name: "banner",
            type: "arquivo",
            props: {
                name: "banner",
                label: "Selecione um banner",
                multiple: false,
            },
        },
        {
            name: "descricao",
            type: "textarea",
            props: {
                name: "descricao",
                label: "Descrição",
                placeholder: "Digite uma descrição...",
                rows: 4,
            },
        },
        {
            name: "escolaFormacao",
            type: "input",
            props: {
                name: "escolaFormacao",
                label: "Escola de formação",
                placeholder: "Digite a sua antiga escola...",
            },
        },
        {
            name: "instituicaoAtual",
            type: "input",
            props: {
                name: "instituicaoAtual",
                label: "Instituição atual",
                placeholder: "Digite a instituição que você faz parte...",
            },
        },
    ],
};
export default sections;
