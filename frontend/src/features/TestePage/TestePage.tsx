"use client"

import type React from "react"
import { useState } from "react"
import { Card, Typography, Space, Divider, Alert } from "antd"
import BeeDropdown from "../../components/BeeDropdown/BeeDropdown"
import type { ICategoria } from "../../components/BeeDropdown/IBeeDropdown"

const { Title, Text, Paragraph } = Typography

const TestePage: React.FC = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<ICategoria | null>(null)
  const [historico, setHistorico] = useState<ICategoria[]>([])

  const handleCategoriaSelect = (categoria: ICategoria) => {
    console.log("🎯 Categoria selecionada:", categoria)
    setCategoriaSelecionada(categoria)
    setHistorico((prev) => [categoria, ...prev.slice(0, 4)]) // Manter últimas 5 seleções
  }

  const resetarTeste = () => {
    setCategoriaSelecionada(null)
    setHistorico([])
  }

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Card>
        <Title level={2} style={{ textAlign: "center", color: "#333333" }}>
          🧪 Página de Teste - BeeDropdown
        </Title>

        <Paragraph style={{ textAlign: "center", color: "#666" }}>
          Esta página é para testar o componente BeeDropdown que carrega categorias da API.
        </Paragraph>

        <Divider />

        {/* Área de Teste Principal */}
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Teste 1: Dropdown Básico */}
          <Card size="small" title="📋 Teste 1: Dropdown Básico">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>Clique no dropdown abaixo para selecionar uma categoria:</Text>

              <BeeDropdown placeholder="Selecione uma categoria..." onSelect={handleCategoriaSelect} />

              {categoriaSelecionada && (
                <Alert
                  message="Categoria Selecionada"
                  description={
                    <div>
                      <strong>Nome:</strong> {categoriaSelecionada.nome}
                      <br />
                      <strong>Tipo:</strong> {categoriaSelecionada.tipo}
                      <br />
                      <strong>ID:</strong> {categoriaSelecionada.id}
                    </div>
                  }
                  type="success"
                  showIcon
                />
              )}
            </Space>
          </Card>

          {/* Teste 2: Dropdown Desabilitado */}
          <Card size="small" title="🚫 Teste 2: Dropdown Desabilitado">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>Este dropdown está desabilitado:</Text>

              <BeeDropdown placeholder="Dropdown desabilitado" onSelect={handleCategoriaSelect} disabled={true} />
            </Space>
          </Card>

          {/* Teste 3: Dropdown com Categoria Pré-selecionada */}
          <Card size="small" title="✅ Teste 3: Com Categoria Pré-selecionada">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>Este dropdown tem uma categoria pré-selecionada:</Text>

              <BeeDropdown
                placeholder="Categoria pré-selecionada"
                onSelect={handleCategoriaSelect}
                selectedCategory={categoriaSelecionada}
              />
            </Space>
          </Card>

          {/* Teste 4: Dropdown Customizado */}
          <Card size="small" title="🎨 Teste 4: Estilo Customizado">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>Este dropdown tem estilo customizado:</Text>

              <BeeDropdown
                placeholder="Dropdown customizado"
                onSelect={handleCategoriaSelect}
                style={{
                  minWidth: "300px",
                  backgroundColor: "#f0f0f0",
                  borderColor: "#FCBD18",
                }}
                className="custom-dropdown"
              />
            </Space>
          </Card>

          {/* Histórico de Seleções */}
          {historico.length > 0 && (
            <Card size="small" title="📊 Histórico de Seleções">
              <Space direction="vertical" style={{ width: "100%" }}>
                {historico.map((categoria, index) => (
                  <div
                    key={`${categoria.id}-${index}`}
                    style={{
                      padding: "8px",
                      backgroundColor: index === 0 ? "#f6ffed" : "#fafafa",
                      border: "1px solid #d9d9d9",
                      borderRadius: "4px",
                    }}
                  >
                    <Text strong>{categoria.nome}</Text> -<Text type="secondary"> {categoria.tipo}</Text> -
                    <Text type="secondary"> ID: {categoria.id}</Text>
                    {index === 0 && <Text style={{ color: "#52c41a" }}> (Mais recente)</Text>}
                  </div>
                ))}
              </Space>
            </Card>
          )}

          {/* Botões de Controle */}
          <Card size="small" title="🎛️ Controles de Teste">
            <Space>
              <button
                onClick={resetarTeste}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ff4d4f",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                🔄 Resetar Teste
              </button>

              <button
                onClick={() => console.log("Estado atual:", { categoriaSelecionada, historico })}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1890ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                📝 Log Estado no Console
              </button>
            </Space>
          </Card>

          {/* Informações de Debug */}
          <Card size="small" title="🔍 Debug Info">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>
                <strong>Categoria Atual:</strong> {categoriaSelecionada ? categoriaSelecionada.nome : "Nenhuma"}
              </Text>
              <Text>
                <strong>Total de Seleções:</strong> {historico.length}
              </Text>
              <Text>
                <strong>Console:</strong> Abra o console do navegador (F12) para ver os logs detalhados
              </Text>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  )
}

export default TestePage
