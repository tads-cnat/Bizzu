import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { IBeeUser } from "../features/Perfil/components/BeeHeaderProfile/IBeeUser";
import UsuarioService from "../services/models/UsuarioService";
import acessAuth from "./acessAuth";

const submitData: SubmitHandler<any> =  (data) => {
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
        if (data.texto !== null && data.texto !== undefined){
            dataSubmit.append("texto", data.texto);
        }
        if (data.imagem !== null && data.imagem !== undefined){
            dataSubmit.append("imagem", data.imagem);
        }
        if (data.categorias !== null && data.categorias !== undefined){
            for (let i = 0; i < data.categorias.length; i++) {
                dataSubmit.append("categorias", String(data.categorias[i]));
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

        return {"username" : username, "dataSubmit" : dataSubmit};
    };

export default submitData;