import * as yup from "yup";

const schema = yup.object().shape({
    nome: yup.string().required("O nome é obrigatório"),
    descricao: yup.string().optional(),
    escolaFormacao: yup.string().optional(),
    instituicaoAtual: yup.string().optional(),
    imagemPerfil: yup.mixed().nullable().optional(),
    banner: yup.mixed().optional(),
});


export default schema;