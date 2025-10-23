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

|    Data    | Versão |            Descrição            |      Autores      |
| :--------: | :----: | :-----------------------------: | :---------------: |
| 26/09/2025 |  1.0   |         Versão inicial          | Fábio e Ana Maria |
| 28/09/2025 |  1.1   |  Adiciona CDU manter postagem   |     Ana Maria     |
| 29/09/2025 |  1.2   |      Adiciona CDU Ver Feed      |   Luiz Fernando   |
| 29/09/2025 |  1.3   | Adiciona CDU manter repositório |       Fábio       |

## Testes Funcionais

### CDU 001 - Manter repositório

#### Fluxo Principal - Criar repositório

| Comunidade | Título                                                                                    | Descrição                                                                                                                                                                                                                                                                               | Arquivo        | Categoria              | Resultado esperado                                                            | Resultado obtido | Situação |
| ---------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------- | ---------------- | -------- |
| Tads       | PPC de Tads                                                                               | Um repositório para TADS                                                                                                                                                                                                                                                                | ppc.pdf,ppc.jpg        | 1° período             | Repositório criado com sucesso!                                               | -                | -        |
| Redes      | PPC de redes                                                                              | Um repositório para Redes                                                                                                                                                                                                                                                               | ppc.pdf,ppc.jpg        | -                      | Erro ao criar repositório: preencha todos os campos obrigatórios.             | -                | -        |
| Infoweb    | -                                                                                         | Um repositório para guardar as provas da matéria de web design                                                                                                                                                                                                                          | prova_sistemas.pdf,prova_algoritmos     | 1° período, Web design | Erro ao criar repositório: preencha todos os campos obrigatórios.             | -                | -        |
| -          | Ajuda para EDNL                                                                           | Um repositório com dicas sobre a matéria de ednl                                                                                                                                                                                                                                        | dicas_ednl.pdf, dicas_edl.jpg | 4° período, EDNL       | Erro ao criar repositório: preencha todos os campos obrigatórios.             | -                | -        |
| Infoweb    | -                                                                                         | Um repositório para guardar as provas da matéria de PDS                                                                                                                                                                                                                                 | provas.mp4     | 3° Período, PDS        | Erro ao criar repositório: Tipo de arquivo não é permitido.                   | -                | -        |
| Tads       | EDNL: repositório com dicas, materiais e suporte para estudar e entender melhor a matéria | Um repositório com dicas sobre a matéria de ednl                                                                                                                                                                                                                                        | dicas_ednl.pdf | 4° período, EDNL       | Erro ao criar repositório, título não pode ser maior que 100 caracteres.      | -                | -        |
| Tads       | EDNL: repositório com dicas, materiais e suporte para estudar e entender melhor a matéria | Repositório criado para apoiar os estudos da disciplina de Estruturas de Dados e Níveis Lógicos (EDNL). Contém materiais de apoio, resumos, dicas práticas, exemplos de exercícios, explicações de algoritmos e arquivos complementares, servindo como guia para reforçar o aprendizado | dicas_ednl.pdf | 4° período, EDNL       | Erro ao criar repositório, a descrição não pode ser maior que 255 caracteres. | -                | -        |
| Redes | Programação básica | Repositório criado para auxiliar os estudos em programação| algoritmos.pdf,programacao_basica.jpg, programação_geral.pdf| 2° Período, algoritmos, programação         | Erro ao criar repositório: o tamanho do arquivo é muito grande. | -                | -        |

#### Fluxo Principal - Ler repositório

| id do Repositório | Resultado esperado                                               | Resultado obtido | Situação |
| ----------- | ---------------------------------------------------------------- | ---------------- | -------- |
| -           | Retorna o repositório e as informações dele.                     | -                | -        |
| -           | Erro ao carregar repositório: repositório não encontrado.        | -                | -        |
| -           | Erro ao carregar repositório: você não segue nenhum usuário.     | -                | -        |
| -           | Erro ao carregar repositório: você não segue nenhuma comunidade. | -                | -        |

#### Fluxo Principal - Deletar repositório

| Repositório | Resultado esperado                                               | Resultado obtido | Situação |
| ----------- | ---------------------------------------------------------------- | ---------------- | -------- |
| 01          | Repositório deletado com sucesso.                     | -                | -        |
| 50          | Erro ao deletar repositório: repositório não encontrado.        | -                | -        |
| 1240        | Erro ao deletar repositório: Para deletar o repositório é necessário ser dono do mesmo.     | -                | -        |


#### Fluxo Principal - Atualizar repositório

| Comunidade            | Título                                                                                                   | Descrição                                                                                                                                                                                                                                                        | Arquivo                    | Categoria                      | Resultado esperado                                                              | Resultado obtido | Situação |
| --------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------ | ------------------------------------------------------------------------------- | ---------------- | -------- |
| Redes de computadores | PPC de redes de computadores                                                                             | Um repositório para o curso de Redes do IFRN                                                                                                                                                                                                                     | ppc_redes.pdf              | 1° período, Introdução a redes | Repositório atualizado com sucesso!                                             | -                | -        |
| -                     | PPC de redes de computadores                                                                             | Um repositório para o curso de Redes do IFRN                                                                                                                                                                                                                     | ppc_redes.pdf,ppc_redes.jpg              | 1° período, Introdução a redes | Erro ao atualizar repositório: preencha todos os campos obrigatórios.           | -                | -        |
| Tads                  | -                                                                                                        | Um repositório para o curso de Tads do IFRN                                                                                                                                                                                                                      | ppc_tads.pdf               | 1° período                     | Erro ao atualizar repositório: preencha todos os campos obrigatórios.           | -                | -        |
| Redes de computadores | Guia devops                                                                                              | Um repositório com algumas dicas para quem tem interesse em ser devops                                                                                                                                                                                           | -                          | 1° período                     | Erro ao atualizar repositório: preencha todos os campos obrigatórios.           | -                | -        |
| Tads                  | Guia para sistemas digitais                                                                              | Um repositório para o curso de Tads do IFRN com algumas dicas para a matéria de sistemas digitais                                                                                                                                                                | sistemas_digitais_tads.pdf | -                              | Erro ao atualizar repositório: preencha todos os campos obrigatórios.           | -                | -        |
| Infoweb               | Infoweb: repositório com provas gerais, materiais de estudo e recursos para a matéria de desenvolvimento | -                                                                                                                                                                                                                                                                | provas_gerais.pdf, provas_webdesign.pdf, provas_informatica.pdf          | Web design, PDS                | Erro ao atualizar repositório: o título não pode ter mais de 100 caracteres.    | -                | -        |
| Infoweb               | Infoweb: repositório com provas gerais e materiais de estudo                                             | -                                                                                                                                                                                                                                                                | provas_gerais.mp4, provas_bd.pdf          | Web design, PDS                | Erro ao atualizar repositório: o tipo de arquivo não é permitido.               | -                | -        |
| Tads                  | Explicando algoritmos                                                                                    | Repositório criado para auxiliar os estudos em Algoritmos, com foco em lógica de programação. Contém exercícios resolvidos, dicas práticas, exemplos de código e materiais que facilitam a compreensão de estruturas condicionais, repetições, vetores e funções | algoritmos.pdf             | 2° Período, algoritmos         | Erro ao atualizar repositório: a descrição não pode ter mais de 255 caracteres. | -                | -        |
| Tads| Explicando algoritmo| Repositório criado para auxiliar os estudos em Algoritmos| algoritmos.pdf,programacao_basica.jpg| 2° Período, algoritmos         | Erro ao atualizar repositório: o tamanho do arquivo é muito grande. | -                | -        |

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



