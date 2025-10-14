import * as yup from "yup";

const schema = yup.object().shape({
    nome: yup
        .string()
        .required("Nome é obrigatório")
        .min(1, "Nome não pode estar vazio")
        .max(50, "Nome não pode ter mais de 50 caracteres"),
    descricao: yup
        .string()
        .required("Descrição é obrigatória")
        .min(1, "Decrição não pode estar vazia")
        .max(200, "Decrição não pode ter mais de 200 caracteres"),
    imagem: yup.mixed().nullable().optional(),
    fundacao: yup
        .string()
        .optional(),
    coodenacao: yup
        .string()
        .optional(),
    banner: yup.mixed().nullable().optional(),
    
});

export default schema;