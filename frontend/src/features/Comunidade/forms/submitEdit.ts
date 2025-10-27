
import ComunidadeService from "../../../services/models/ComunidadeService";
import submitData from "../../../utils/submit";
import { NavigateFunction } from "react-router-dom";

const onSubmit: any = async (id: number, data: any, caminho: NavigateFunction, usuario: any, username: any) => {
        const info: any = submitData(data, usuario)
        
        try {
            await ComunidadeService.patch(id,info);
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "success",
                        mensagem: "Comunidade editada com sucesso.",
                    },
                },
            });
        } catch (e) {
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "error",
                        mensagem: "Erro ao editar comunidade.",
                    },
                },
            });
            console.error("Deu mal", e);
        }
    };

export default onSubmit;