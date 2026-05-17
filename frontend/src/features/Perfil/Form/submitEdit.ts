
import UsuarioService from "../../../services/models/UsuarioService";
import submitData from "../../../utils/submit";
import { NavigateFunction } from "react-router-dom";

const onSubmit: any = async (data: any, caminho: NavigateFunction, usuario: any, username: any) => {
    // if (data.imagemPerfil === null) {
    //     data.imagemPerfil = "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png";
    // }        
    const info: any = submitData(data, usuario);
    try {
        await UsuarioService.patch(usuario.id,info);
        caminho(`/${username}/`, {
            state: {
                alerta: {
                    tipo: "success",
                    mensagem: "Perfil editado com sucesso.",
                },
            },
        });
    } catch (e) {
        caminho(`/${username}/`, {
            state: {
                alerta: {
                    tipo: "error",
                    mensagem: "Erro ao editar prfil.",
                },
            },
        });
        console.error("Deu mal", e);
    }
    };

export default onSubmit;