
import ComunidadeService from "../../../services/models/ComunidadeService";
import submitData from "../../../utils/submit";
import { NavigateFunction } from "react-router-dom";

const onSubmit: any = async (data: any, caminho: NavigateFunction, usuario: any, username: any) => {
        const info: any = submitData(data, usuario);
    
        try {
            await ComunidadeService.post(info);
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "success",
                        mensagem: "Comunidade criada com sucesso.",
                    },
                },
            });
        } catch (e) {
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "error",
                        mensagem: "Erro ao criar comunidade.",
                    },
                },
            });
            console.error("Deu mal", e);
        }
    };

export default onSubmit;