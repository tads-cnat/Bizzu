"use client"

import React, { useEffect, useState } from "react"
import { Dropdown, Button, message, Spin } from "antd"
import { DownOutlined, TagOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import type { IBeeDropdown, ICategoria } from "./IBeeDropdown"
import CategoriaService from "../../services/models/CategoriaService"

const BeeDropdown: React.FC<IBeeDropdown> = ({
  placeholder = "Selecione uma categoria",
  onSelect,
  disabled = false,
  selectedCategory = null,
  style,
  className,
}) => {
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarCategorias = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await CategoriaService.listAll()

        if (response.data && Array.isArray(response.data)) {
          setCategorias(response.data)
        } else {
          setCategorias([])
          setError("Formato de dados inválido")
        }
      } catch (err) {
        console.error("Erro ao carregar categorias:", err)
        setError("Erro ao carregar categorias")
        message.error("Não foi possível carregar as categorias")
      } finally {
        setLoading(false)
      }
    }

    carregarCategorias()
  }, [])

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    const categoriaSelecionada = categorias.find((categoria) => categoria.id.toString() === key)

    if (categoriaSelecionada) {
      message.info(`Categoria selecionada: ${categoriaSelecionada.nome}`)

      onSelect(categoriaSelecionada)
    }
  }

  const getCorPorTipo = (tipo: "tec" | "mat" | "per"): string => {
    const cores = {
      tec: "#FCBD18", // Amarelo
      mat: "#058B92", // Ciano
      per: "#F2C94C", // Amarelo claro
    }
    return cores[tipo] || "#6FCF97"
  }
  const getNomeTipo = (tipo: "tec" | "mat" | "per"): string => {
    const nomes = {
      tec: "Tecnologia",
      mat: "Matéria",
      per: "Período",
    }
    return nomes[tipo] || tipo
  }

  const menuItems: MenuProps["items"] = React.useMemo(() => {
    if (categorias.length === 0) {
      return [
        {
          key: "empty",
          label: "Nenhuma categoria encontrada",
          disabled: true,
        },
      ]
    }

    const categoriasPorTipo = categorias.reduce(
      (acc, categoria) => {
        if (!acc[categoria.tipo]) {
          acc[categoria.tipo] = []
        }
        acc[categoria.tipo].push(categoria)
        return acc
      },
      {} as Record<string, ICategoria[]>,
    )

    const items: MenuProps["items"] = []

    Object.entries(categoriasPorTipo).forEach(([tipo, categoriasDoTipo]) => {
      items.push({
        key: `header-${tipo}`,
        label: (
          <div
            style={{
              fontWeight: "bold",
              color: getCorPorTipo(tipo as "tec" | "mat" | "per"),
              borderBottom: `2px solid ${getCorPorTipo(tipo as "tec" | "mat" | "per")}`,
              paddingBottom: "4px",
              marginBottom: "4px",
            }}
          >
            {getNomeTipo(tipo as "tec" | "mat" | "per")}
          </div>
        ),
        disabled: true,
      })

      categoriasDoTipo.forEach((categoria) => {
        items.push({
          key: categoria.id.toString(),
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: getCorPorTipo(categoria.tipo),
                }}
              />
              <span>{categoria.nome}</span>
            </div>
          ),
        })
      })

      const tipos = Object.keys(categoriasPorTipo)
      if (tipo !== tipos[tipos.length - 1]) {
        items.push({
          type: "divider",
        })
      }
    })

    return items
  }, [categorias])
  const buttonText = selectedCategory ? selectedCategory.nome : placeholder

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick,
      }}
      disabled={disabled || loading}
      trigger={["click"]}
      placement="bottomLeft"
    >
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: "200px",
          ...style,
        }}
        className={className}
        disabled={disabled}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {loading ? <Spin size="small" /> : <TagOutlined style={{ color: "#FCBD18" }} />}
          <span style={{ color: selectedCategory ? "#333333" : "#B0B0B0" }}>{buttonText}</span>
        </div>
        <DownOutlined style={{ fontSize: "12px", color: "#B0B0B0" }} />
      </Button>
    </Dropdown>
  )
}

export default BeeDropdown
