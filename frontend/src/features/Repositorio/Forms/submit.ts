import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRepositorioFormValues } from "../../../interfaces/Repositorio";
import RepositorioService from "../../../services/models/RepositorioService";
import submitData from "../../../utils/submit";

const onSubmit: SubmitHandler<IRepositorioFormValues> = async (data) => {
        const caminho = useNavigate();
        
        const object: any = submitData(data);

        try {
            await RepositorioService.post(object.dataSubmit);
            caminho(`/${object.username}/`, {
                state: {
                    alerta: {
                        tipo: "success",
                        mensagem: "Repositório criado com sucesso.",
                    },
                },
            });
        } catch (e) {
            console.error("Deu mal", e);
            caminho(`/${object.username}/`, {
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