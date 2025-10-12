import { SubmitHandler } from "react-hook-form";

const submitData: SubmitHandler<any> =  (data: any, usuario: any) => {
        const dataSubmit = new FormData();
        
        dataSubmit.append("usuario", String(usuario?.id));
        if (data.texto !== null && data.texto !== undefined){
            dataSubmit.append("texto", data.texto);
        }
        if (data.imagem !== null && data.imagem !== undefined){
            dataSubmit.append("imagem", data.imagem);
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
        if (data.descricao !== null && data.descricao !== undefined){
            dataSubmit.append("descricao", data.descricao);
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