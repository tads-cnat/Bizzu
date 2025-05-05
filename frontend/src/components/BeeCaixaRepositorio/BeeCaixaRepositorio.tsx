import React from "react";
import { CaixaRepositorioProps } from "./BeeCaixaRepositorio.props";
import BeeTags from "./components/BeeTags/BeeTags";

// Função para calcular o tempo que faz desde a publicação do repositório
function tempoDesde(data: Date): string {
    const agora = new Date();
    const diffMs = agora.getTime() - data.getTime();
    const diffSegundos = Math.floor(diffMs / 1000);
  
    const minutos = Math.floor(diffSegundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
  
    if (dias > 0) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
    if (horas > 0) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
    if (minutos > 0) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
    return "agora mesmo";
  }

export const CaixaRepositorio = ({
    usuarioIconeUrl,
    usuarioNome,
    dataPostagem,
    tituloPostagem;
    descricaoPostagem: string;
    tags: IBeeTags[];
    onClick?: () => void;

})