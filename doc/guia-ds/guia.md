# Guia do Desenvolvedor

Para manter a organização e garantir que o trabalho em equipe seja eficiente, é fundamental seguir certos padrões e práticas no GitHub. Este manual irá orientá-lo sobre como trabalhar de forma colaborativa em nossos projetos.

**Histórico de Alterações:**
| Versão | Autor | Data |
|--------|-------|------|
| 1.0 | Fellipe Aleixo | 11 de abril de 2023 |
| 2.0 | Ana Maria | 09 de maio de 2025 |

## 1. INTRODUÇÃO

Este documento estabelece os padrões para desenvolvimento colaborativo no GitHub, garantindo organização e qualidade do código.

## 2. FLUXO PRINCIPAL DE TRABALHO

### 2.1 Atribuição/Criação de Issues

- Issues serão atribuídas pelo orientador
- Desenvolvedores podem criar issues quando autorizados
  Exemplo: "Criar componente de header responsivo"

### 2.2 Criação de Branch

- Crie uma branch específica para cada issue
- Use nomes descritivos (ex: feature/header-component)

### 2.3 Sincronização

Execute no terminal:

```git
git fetch
git checkout nome-da-branch

```

### 2.4 Desenvolvimento

- Faça commits frequentes com mensagens semânticas
- Consulte a seção "Padrão de Commits" abaixo

### 2.5 Pull Request

- Ao concluir, crie um PR para a branch development
- Adicione gerente e professor como revisores

### 2.6 Revisão de Código

Requisitos:

- Pelo menos 2 aprovações
  Siga estes passos:

1. Acesse a branch:

```git
git checkout branch-do-pr
```

2. Revise cuidadosamente:

- Qualidade do código
- Possíveis problemas
- Impacto na aplicação

3. Comente diretamente no GitHub:

- Inclua sugestões quando necessário
- Rejeite se encontrar problemas

### 2.7 Merge

Aprovado por 2 revisores? Faça merge com development

## 3. CONFIGURAÇÃO DO AMBIENTE

### 3.1 Pré-requisitos

Git instalado

Extensões VSCode:

- Prettier
- ESLint
- Black Formatter

### 3.2 Front-end

1. Clone o repositório
2. Acesse a pasta:

```ts
cd frontend
```

3. Instale dependências:

```ts
npm install -g yarn
yarn
```

### 3.3 Back-end

1. Acesse a pasta:

```py
cd backend
```

2. Crie ambiente virtual:

```py
python -m venv venv
source venv/bin/activate (Linux/Mac)
venv\Scripts\activate (Windows)
```

3. Instale dependências:

```py
pip install -r requirements.txt
```

## 4. PADRÃO DE COMMITS

### 4.1 Estrutura

<tipo>: <mensagem> <br>
Exemplo:
fix: Corrige alinhamento do footer

### 4.2 Tipos principais

| Prefixo |                                         Utilidade                                         |
| :-----: | :---------------------------------------------------------------------------------------: |
|  feat   |                            Nova funcionalidade para o usuário                             |
|   fix   |                     Quando você consertar algo no seu código, um bug                      |
|  docs   |               Quando está relacionado a criação e alteração da documentação               |
|  style  |       Alterações na formatação do código mas sem mudança no funcionamento do código       |
| remove  |                                     Remoção de código                                     |
|  chore  | Atualizações de configurações de administrador e pacotes (não inclui alteração no código) |

## 5. CONFIGURAÇÕES RECOMENDADAS

Docker Desktop

Black Formatter (Python)

Prettier (JavaScript/TypeScript)

Crie arquivo .prettierrc na raiz:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

DICA: Faça commits frequentes durante o desenvolvimento para facilitar o rastreamento.
