# 1 Introdução 
Este documento reúne os casos de teste elaborados para validar os principais fluxos da aplicação Bizzu, desenvolvida no contexto do PDS Corporativo. Os testes aqui descritos abrangem diferentes casos de uso da aplicação, com o objetivo de assegurar que cada funcionalidade opere conforme os requisitos definidos.

Cada caso de teste inclui informações detalhadas sobre o cenário a ser avaliado, os dados de entrada necessários e resultados esperados.
## 1.1 Visão geral
O documento foi estruturado para garantir clareza e facilitar a consulta aos testes da aplicação Bizzu. Ele apresenta a introdução ao propósito dos testes, uma visão geral dos critérios de seleção dos casos de uso e, por fim, os testes funcionais com seus respectivos cenários, dados e resultados esperados, servindo como referência para as equipes de desenvolvimento e qualidade. <br> <br>
|-🗂️ **1 Introdução** <br>
| |- 📑 1.1 Visão geral <br>
|- 🗂️ **2 Testes Funcionais** <br>

## Testes Funcionais

### CDU 001 - Manter repositório
#### Fluxo Principal - Criar repositório
| Entrada 01  | Entrada 02  | Entrada 03 | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- | ------------- | ------------- | ------------- |------------- | 
| Comunidade | Título | Descrição | "Erro: não foi possível criar repositório, informações faltando.  | - |- |

### CDU 011 - Ver feed

#### Fluxo Principal - Visualizar postagens nos feeds (pessoas e comunidades)

| Entrada 01                | Entrada 02                                          | Entrada 03                                 | Resultado esperado                                                                                                                 |
| ------------------------- | --------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Usuário autenticado       | Segue 2 pessoas                                     | Ambas possuem postagens recentes           | Feed de pessoas exibe postagens dessas 2 pessoas em ordem cronológica. Interações habilitadas.                                     |
| Usuário autenticado       | Não segue nenhuma pessoa                            | -                                          | Feed de pessoas exibe mensagem: “Nenhuma publicação disponível. Siga pessoas para ver suas postagens.”                             |
| Usuário autenticado       | Segue comunidade TADS                               | Existem postagens em TADS, InfoWeb e Redes | Feed de comunidades exibe somente postagens da TADS em ordem cronológica. Interações habilitadas.                                  |
| Usuário autenticado       | Não segue nenhuma comunidade                        | -                                          | Feed de comunidades exibe mensagem: “Nenhuma publicação disponível. Siga comunidades para ver suas postagens.”                     |
| Usuário autenticado       | Segue todas as comunidades (TADS, InfoWeb e Redes)  | Existem postagens em todas                 | Feed de comunidades exibe postagens de todas as comunidades seguidas, em ordem cronológica.                                        |
| Visitante não autenticado | Existem postagens públicas em TADS, InfoWeb e Redes | -                                          | Feed inicial exibe todas as postagens públicas, ordenadas por data. Interações (curtir/comentar/denunciar) aparecem desabilitadas. |
| Visitante não autenticado | Nenhuma postagem pública disponível                 | -                                          | Feed inicial exibe mensagem: “Nenhuma postagem pública disponível no momento.”                                                     |
| Usuário autenticado       | Tentativa de acessar feed com sessão expirada       | -                                          | Sistema redireciona para login com mensagem: “Sua sessão expirou.”                                                                 |
| Visitante não autenticado | Clica em curtir/comentar/denunciar                  | -                                          | Sistema direciona para tela/modal de login com mensagem: “Faça login para continuar.”                                              |

### CDU 011 - Acessar Perfil

## 1. Identificar Entradas e Condições

| Entrada  | Condição                   |
|----------|----------------------------|
| username | Condição 01 – existe no banco |
|          | Condição 02 – não existe no banco |

## 2. Definir Classes de Equivalência

| Entrada  | Condição    | Classe Válida          | Classe Inválida       |
|----------|-------------|------------------------|-----------------------|
| username | Condição 01 | username cadastrado    | username inexistente  |
| username | Condição 02 | username inexistente   | username cadastrado   |

## 3. Análise de Valor Limite

| Entrada  | Limite | Valor Testado | Esperado |
|----------|--------|---------------|-----------|
| username | mínimo 3 caracteres | `abc` (3) | Aceito |
| username | abaixo do mínimo | `ab` (2) | Rejeitado |
| username | máximo 30 caracteres | `a...a` (30) | Aceito |
| username | acima do máximo | `a...a` (31) | Rejeitado |

## 4. Definir Casos de Teste

| Entrada (username) | Saída Esperada |
|-------------------|---------------|
| `joao123` (existe) | Retorna dados do perfil (200 + JSON) |
| `naoexiste999` (não existe) | Retorna mensagem de erro ou 404 |
| `ab` (abaixo do limite) | Retorna erro de validação |
| `abc` (no limite mínimo) | Retorna dados do perfil ou erro conforme existência |
| `a...a` (31 caracteres) | Retorna erro de validação |



