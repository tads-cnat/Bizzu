import { SubmitHandler } from "react-hook-form";

const submitData: SubmitHandler<any> =  (data: any, usuario: any) => {
    const dataSubmit = new FormData();
    if (data.usuario !== null && data.usuario !== undefined){
        dataSubmit.append("usuario", String(usuario?.id));
    }
    if (data.texto !== null && data.texto !== undefined){
        dataSubmit.append("texto", data.texto);
    }
    if (data.imagem !== null && data.imagem !== undefined && data.imagem instanceof File){
            dataSubmit.append("imagem", data.imagem);
        }
    if (data.nome !== null && data.nome !== undefined){
        dataSubmit.append("nome", data.nome);
    }
    if (data.imagemPerfil !== null && data.imagemPerfil !== undefined && data.imagemPerfil instanceof File){
        dataSubmit.append("imagemPerfil", data.imagemPerfil);
    }
    if (data.categoria !== null && data.categoria !== undefined){
        for (let i = 0; i < data.categoria.length; i++) {
            dataSubmit.append("categorias", String(data.categoria[i]));
        }
    }
    if (data.comunidade !== null && data.comunidade !== undefined){
        dataSubmit.append("comunidade", String(data.comunidade?.value));
    }
    if (data.titulo !== null && data.titulo !== undefined){
        dataSubmit.append("titulo", data.titulo);
    }
    if (data.escolaFormacao !== null && data.escolaFormacao !== undefined){
        dataSubmit.append("escolaFormacao", data.escolaFormacao);
    }
    if (data.instituicaoAtual !== null && data.instituicaoAtual !== undefined){
        dataSubmit.append("instituicaoAtual", data.instituicaoAtual);
    }
    if (data.banner !== null && data.banner !== undefined && data.banner instanceof File){
        dataSubmit.append("banner", data.banner);
    }
    if (data.descricao !== null && data.descricao !== undefined){
        dataSubmit.append("descricao", data.descricao);
    }
    if (data.coordenacao !== null && data.coordenacao !== undefined){
        dataSubmit.append("coordenacao", data.coordenacao);
    }
    if (data.fundacao !== null && data.fundacao !== undefined){
        dataSubmit.append("anoFundacao", data.fundacao.toISOString().split("T")[0]);
    }
    if (data.arquivo && Array.isArray(data.arquivo)) {
        data.arquivo.forEach((file: File) => {
            dataSubmit.append("arquivos[]", file);
        });
    } else if (data.arquivo) {
        dataSubmit.append("arquivos[]", data.arquivo);
    }    
    return dataSubmit;
    };

export default submitData;