
import PostagemService from "../../../services/models/PostagemService"
import submitData from "../../../utils/submit";
import { NavigateFunction } from "react-router-dom";

const onSubmit: any = async (data: any, caminho: NavigateFunction, usuario: any, username: any) => {
        const info: any = submitData(data, usuario);
    
        try {
            await PostagemService.post(info);
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "success",
                        mensagem: "Postagem criada com sucesso.",
                    },
                },
            });
        } catch (e) {
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "error",
                        mensagem: "Erro ao criar postagem.",
                    },
                },
            });
            console.error("Deu mal", e);
        }
    };

export default onSubmit;