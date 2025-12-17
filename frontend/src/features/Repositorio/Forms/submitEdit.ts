
import { NavigateFunction } from "react-router-dom";

import RepositorioService from "../../../services/models/RepositorioService";
import submitData from "../../../utils/submit";

const onSubmit: any = async (id:number, data: any, caminho: NavigateFunction, username: any) => {
        const object: any = submitData(data);

        try {
            await RepositorioService.patch(id,object);
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "success",
                        mensagem: "Repositório editado com sucesso.",
                    },
                },
            });
        } catch (e) {
            console.error("Deu mal", e);
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "error",
                        mensagem: "Erro ao editar repositório.",
                    },
                },
            });
        }
    };

export default onSubmit;