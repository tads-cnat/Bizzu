"use client"

import { useState, useEffect } from "react"
import CurtidaService from "../services/models/CurtidaService"
import acessAuth from "../utils/acessAuth"

export function useCurtida(postagemId: number | undefined) {
  const [curtido, setCurtido] = useState(false)
  const [contagem, setContagem] = useState(0)
  const [carregando, setCarregando] = useState(false)
  const { id: usuarioId } = acessAuth()

  // Verifica se o usuário já curtiu a postagem
  useEffect(() => {
    if (!postagemId || !usuarioId) return

    const verificarCurtida = async () => {
      try {
        const resposta = await CurtidaService.verificarCurtida(usuarioId, postagemId)
        setCurtido(resposta.curtido || false)
      } catch (error) {
        setCurtido(false)
      }
    }

    const contarCurtidas = async () => {
      try {
        const total = await CurtidaService.contarCurtidas(postagemId)
        setContagem(total || 0)
      } catch (error) {
        setContagem(0)
      }
    }

    verificarCurtida()
    contarCurtidas()
  }, [postagemId, usuarioId])

  // Função para alternar entre curtir e descurtir
  const alternarCurtida = async () => {
    if (!postagemId || !usuarioId || carregando) return

    setCarregando(true)

    try {
      const resposta = await CurtidaService.alternarCurtida(usuarioId, postagemId)

      if (resposta && typeof resposta === "object") {
        setCurtido(resposta.curtido)
        setContagem(resposta.total || 0)
      } else {
        window.location.reload()
      }
    } catch (error) {
      alert("Erro ao curtir/descurtir postagem. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return { curtido, contagem, alternarCurtida, carregando }
}
