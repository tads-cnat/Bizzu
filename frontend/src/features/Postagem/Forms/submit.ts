import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PostagemService from "../../../services/models/PostagemService";
import UsuarioService from "../../../services/models/UsuarioService";
import acessAuth from "../../../utils/acessAuth";
import { IBeeUser } from "../../Perfil/components/BeeHeaderProfile/IBeeUser";

const onSubmit: SubmitHandler<any> = async (data) => {
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
        dataSubmit.append("usuario", String(usuario?.id));
        dataSubmit.append("texto", data.texto);
        if (data.imagem !== null && data.imagem !== undefined)
            dataSubmit.append("imagem", data.imagem);
        for (let i = 0; i < data.categorias.length; i++) {
            dataSubmit.append("categorias", String(data.categorias[i]));
        }
        dataSubmit.append("comunidade", String(data.comunidade?.value));
        try {
            await PostagemService.post(dataSubmit);
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