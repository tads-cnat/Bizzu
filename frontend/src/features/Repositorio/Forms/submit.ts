
import { NavigateFunction } from "react-router-dom";

import RepositorioService from "../../../services/models/RepositorioService";
import submitData from "../../../utils/submit";

const onSubmit: any = async (data: any, caminho: NavigateFunction, username: any) => {
        const object: any = submitData(data);

        try {
            await RepositorioService.post(object);
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "success",
                        mensagem: "Repositório criado com sucesso.",
                    },
                },
            });
        } catch (e) {
            console.error("Deu mal", e);
            caminho(`/${username}/`, {
                state: {
                    alerta: {
                        tipo: "error",
                        mensagem: "Erro ao criar repositório.",
                    },
                },
            });
        }
    };

export default onSubmit;