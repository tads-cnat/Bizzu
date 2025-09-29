# 1 Introdução

Este documento reúne os casos de teste elaborados para validar os principais fluxos da aplicação Bizzu, desenvolvida no contexto do PDS Corporativo. Os testes aqui descritos abrangem diferentes casos de uso da aplicação, com o objetivo de assegurar que cada funcionalidade opere conforme os requisitos definidos.

Cada caso de teste inclui informações detalhadas sobre o cenário a ser avaliado, os dados de entrada necessários e resultados esperados.

## 1.1 Visão geral

O documento foi estruturado para garantir clareza e facilitar a consulta aos testes da aplicação Bizzu. Ele apresenta a introdução ao propósito dos testes, uma visão geral dos critérios de seleção dos casos de uso e, por fim, os testes funcionais com seus respectivos cenários, dados e resultados esperados, servindo como referência para as equipes de desenvolvimento e qualidade. <br> <br>
|-🗂️ **1 Introdução** <br>
| |- 📑 1.1 Visão geral <br>
|- 🗂️ **2 Histórico de Revisões** <br>
|- 🗂️ **3 Testes Funcionais** <br>

## Histórico de Revisões

|    Data    | Versão |          Descrição           |      Autores      |
| :--------: | :----: | :--------------------------: | :---------------: |
| 26/09/2025 |  1.0   |        Versão inicial        | Fábio e Ana Maria |
| 28/09/2025 |  1.1   | Adiciona CDU manter postagem |     Ana Maria     |
| 29/09/2025 |  1.2  | Adiciona CDU Acessar perfil |     Jesrriel Moura     |

## Testes Funcionais

### CDU 001 - Manter repositório

#### Fluxo Principal - Criar repositório

| Entrada 01 | Entrada 02 | Entrada 03 | Resultado esperado                                               | Resultado obtido | Situação |
| ---------- | ---------- | ---------- | ---------------------------------------------------------------- | ---------------- | -------- |
| Comunidade | Título     | Descrição  | "Erro: não foi possível criar repositório, informações faltando. | -                | -        |

### CDU 002 - Manter postagem

#### Fluxo Principal - Criar postagem

| Comunidade | Texto                                                                                                                                                                                                                                                             | Imagem         | Categorias   | Resultado esperado                                     | Resultado obtido | Situação |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------ | ---------------- | -------- |
| TADS       | 👍🏾                                                                                                                                                                                                                                                                | jogo.png       | [Python, PC] | Postagem criada com sucesso!                           | -                | -        |
| Redes      | A programação é uma arte que une lógica e criatividade. Cada linha de código representa uma instrução, mas juntas formam sistemas complexos que impactam o mundo. Dominar linguagens e estruturas é abrir portas para inovar e transformar ideias em realidades   | computador.jpg | [PC]         | Postagem criada com sucesso!                           | -                | -        |
| Redes      | 👍🏾👍🏾👍🏾                                                                                                                                                                                                                                                            | -              | [Python, PC] | Postagem criada com sucesso!                           | -                | -        |
| Infoweb    | desenvolvi um projeto em django rest                                                                                                                                                                                                                              | -              | [Django]     | Error: Você não segue a comunidade.                    | -                | -        |
| TADS       | desenvolvi um projeto em django rest                                                                                                                                                                                                                              | main.py        | [Django]     | Error: Formato do arquivo inválido.                    | -                | -        |
| Redes      | A programação é uma arte que une lógica e criatividade. Cada linha de código representa uma instrução, mas juntas formam sistemas complexos que impactam o mundo. Dominar linguagens e estruturas é abrir portas para inovar e transformar ideias em realidades.. | computador.jpg | [PC]         | Error: Quantidade de caracteres do texto ultrapassada. | -                | -        |
| Redes      |                                                                                                                                                                                                                                                                   | computador.jpg | [PC]         | Error: Você deve inserir um texto.                     | -                | -        |
| -          | desenvolvi um projeto em django rest                                                                                                                                                                                                                              | rest.png       | [Django]     | Error: Você deve inserir uma comunidade.               | -                | -        |
| TADS       | desenvolvi um projeto em django rest                                                                                                                                                                                                                              | rest.png       |              | Error: Você deve inserir pelo menos uma comunidade.    | -                | -        |

> Deve ser considerado que o usuário segue as comunidades de TADS e Redes apenas.

#### Fluxo Secundário - Editar postagem

| Comunidade original | Texto original                                                                                                                                                    | Imagem original | Categorias original | Comunidade | Texto                                                                                                                                                                                                                                                                | Imagem         | Categorias   | Resultado esperado                                     | Resultado obtido | Situação |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------ | ---------------- | -------- |
| TADS                | 👍🏾                                                                                                                                                                | jogo.png        | [Python, PC]        | TADS       | 🎮                                                                                                                                                                                                                                                                   | Imaginário.png | [Python, PC] | Postagem editada com sucesso!                          | -                | -        |
| Redes               | A programação é uma arte que une lógica e criatividade. Cada linha de código representa uma instrução, mas juntas formam sistemas complexos que impactam o mundo. | jogo.png        | [Python, PC]        | Redes      | A inovação tecnológica não depende apenas de máquinas, mas da criatividade humana que as direciona. Cada algoritmo representa escolhas e soluções para problemas reais. Testar, validar e aprender com erros é essencial para construir sistemas confiáveis e úteis. | máquinas.jpg   | [PC]         | Postagem editada com sucesso!                          | -                | -        |
| Redes               | 👍🏾👍🏾👍🏾 -                                                                                                                                                          |                 | [Python, PC]        | TADS       | 👍🏾👍🏾👍🏾                                                                                                                                                                                                                                                               | -              | [Python, PC] | Postagem editada com sucesso!                          | -                | -        |
| Redes               | 👍🏾👍🏾👍🏾                                                                                                                                                            | -               | [Python, PC]        | Redes      | Programação é muito fascinante                                                                                                                                                                                                                                       | -              | [Python, PC] | Postagem editada com sucesso!                          | -                | -        |
| Redes               | 👍🏾👍🏾👍🏾                                                                                                                                                            | -               | [Python, PC]        | Redes      | Programação é muito fascinante                                                                                                                                                                                                                                       | -              | [1° período] | Postagem editada com sucesso!                          | -                | -        |
| Redes               | 👍🏾👍🏾👍🏾                                                                                                                                                            | -               | [Python, PC]        | TADS       | desenvolvi um projeto em django rest                                                                                                                                                                                                                                 | -              | [Django]     | Postagem editada com sucesso!                          | -                | -        |
| TADS                | desenvolvi um projeto em django rest                                                                                                                              | -               | [Django]            | Infoweb    | desenvolvi um projeto em django rest                                                                                                                                                                                                                                 | -              | [Django]     | Error: Você não segue a comunidade.                    | -                | -        |
| TADS                | desenvolvi um projeto em django rest                                                                                                                              | -               | [Django]            | TADS       | desenvolvi um projeto em django rest                                                                                                                                                                                                                                 | main.py        | [Django]     | Error: Formato do arquivo inválido.                    | -                | -        |
| Redes               | A programação é uma arte que une lógica e criatividade. Cada linha de código representa uma instrução, mas juntas formam sistemas complexos que impactam o mundo. | computador.jpg  | [PC]                | Redes      | A programação é uma arte que une lógica e criatividade. Cada linha de código representa uma instrução, mas juntas formam sistemas complexos que impactam o mundo. Dominar linguagens e estruturas é abrir portas para inovar e transformar ideias em realidades..    | computador.jpg | [PC]         | Error: Quantidade de caracteres do texto ultrapassada. | -                | -        |
| TADS                | desenvolvi um projeto em django rest                                                                                                                              | computador.jpg  | [Django]            | TADS       |                                                                                                                                                                                                                                                                      | computador.jpg | [Django]     | Error: Você deve inserir um texto.                     | -                | -        |
| TADS                | desenvolvi um projeto em django rest                                                                                                                              | computador.jpg  | [Django]            | TADS       | desenvolvi um projeto em django rest                                                                                                                                                                                                                                 | computador.jpg | [Django]     | Error: Você deve alterar pelo menos um campo.          | -                | -        |
| TADS                | desenvolvi um projeto em django rest                                                                                                                              | computador.jpg  | [Django]            |            | desenvolvi um projeto em django rest                                                                                                                                                                                                                                 | computador.jpg | [Django]     | Error: Você deve inserir uma comunidade.               | -                | -        |
| TADS                | desenvolvi um projeto em django rest                                                                                                                              | computador.jpg  | [Django]            | TADS       | desenvolvi um projeto em django rest                                                                                                                                                                                                                                 | computador.jpg |              | Error: Você deve inserir pelo menos uma comunidade.    | -                | -        |

> Deve ser considerado que o usuário segue as comunidades de TADS e Redes apenas.

#### Fluxo Secundário - Excluir postagem

| Postagem | Resultado esperado                             | Resultado obtido | Situação |
| -------- | ---------------------------------------------- | ---------------- | -------- |
| 2        | Postagem excluída com sucesso!                 | -                | -        |
| 50       | Error: A postagem não existe no nosso sistema. | -                | -        |

> Caso o ID da postagem selecionada não esteja no banco.

#### Fluxo Secundário - Visualizar postagem

| Entrada | Resultado esperado                                                  | Resultado obtido | Situação |
| ------- | ------------------------------------------------------------------- | ---------------- | -------- |
| -       | Exibição de todas as postagens das comunidades que um usuário segue | -                | -        |
| -       | Exibição de todas as postagens dos usuários que um usuário segue    | -                | -        |
| -       | Error: Você não segue nenhuma comunidade.                           | -                | -        |
| -       | Error: Você não segue nenhum usuário.                               | -                | -        |

### CDU 003 – Acessar Perfil

#### Fluxo Principal – Visualizar perfil por username

| Username           | Resultado esperado                                      | Resultado obtido | Situação |
| ----------------- | ------------------------------------------------------- | ---------------- | -------- |
| joao123           | Exibição dos dados do perfil de joao123                  | -                | -        |
| maria_silva        | Exibição dos dados do perfil de maria_silva              | -                | -        |

> Deve ser considerado que os usuários **joao123** e **maria_silva** existem no sistema.

---

#### Fluxo Secundário – Username inexistente

| Username      | Resultado esperado                                     | Resultado obtido | Situação |
| ------------- | ------------------------------------------------------ | ---------------- | -------- |
| naoexiste999  | Error: Usuário não encontrado.                          | -                | -        |
| teste_invalido | Error: Usuário não encontrado.                          | -                | -        |

---

#### Fluxo Secundário – Análise de Valor Limite

| Username (cenário limite)          | Resultado esperado                                                   | Resultado obtido | Situação |
| --------------------------------- | -------------------------------------------------------------------- | ---------------- | -------- |
| `ab` (2 caracteres – abaixo limite) | Error: Username deve ter no mínimo 3 caracteres                       | -                | -        |
| `abc` (3 caracteres – limite mínimo) | Exibição dos dados do perfil se existir / erro se não existir          | -                | -        |
| `a...a` (30 caracteres – limite máximo) | Exibição dos dados do perfil se existir / erro se não existir        | -                | -        |

