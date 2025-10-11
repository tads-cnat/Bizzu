import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRepositorioFormValues } from "../../../interfaces/Repositorio";
import RepositorioService from "../../../services/models/RepositorioService";
import { useState, useEffect } from "react";
import UsuarioService from "../../../services/models/UsuarioService";
import acessAuth from "../../../utils/acessAuth";
import { IBeeUser } from "../../Perfil/components/BeeHeaderProfile/IBeeUser";

const onSubmit: SubmitHandler<IRepositorioFormValues> = async (data) => {
        const caminho = useNavigate();
        const [usuario, setUsuario] = useState<IBeeUser>();
            const {username} = acessAuth();
        useEffect(() => {
                if (usuario === undefined) {
                    void UsuarioService.getbyUsername(username)
                        .then((response) => {
                            setUsuario(response);
                        })
                        .catch(() => {
                            console.error("Não recebeu dados");
                        });
                }
            }, []);
            
        const dataSubmit = new FormData();
        dataSubmit.append("titulo", data.titulo);
        if (usuario?.id !== undefined)
            dataSubmit.append("usuario", String(usuario.id));
        dataSubmit.append("descricao", data.descricao);
        if (data.imagem && Array.isArray(data.imagem)) {
            data.imagem.forEach((file: File) => {
                dataSubmit.append("arquivos[]", file);
            });
        } else if (data.imagem) {
            dataSubmit.append("arquivos[]", data.imagem);
        }
        for (let i = 0; i < data.categorias.length; i++) {
            dataSubmit.append("categorias", String(data.categorias[i]));
        }
        if (data.comunidade?.value !== undefined)
            dataSubmit.append("comunidade", String(data.comunidade.value));
        try {
            await RepositorioService.post(dataSubmit);
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