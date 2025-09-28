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
| Comunidade  | Título  | Descrição | Arquivo | Categoria | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- | ------------- | ------------- | ------------- |------------- |  ------------- |  ------------- | 
| Tads | PPC de Tads | Um repositório para TADS | ppc.pdf  | 1° período  | Repositório criado com sucesso! | - | - |
| Redes | PPC de redes| Um repositório para Redes | ppc.pdf  | -  | Erro ao criar repositório: preencha todos os campos obrigatórios. | -  | - |
| Infoweb | - | Um repositório para guardar as provas da matéria de web design | provas.pdf | 1° período, Web design  | Erro ao criar repositório: preencha todos os campos obrigatórios.| - | - |
| - | Ajuda para EDNL  | Um repositório com dicas sobre a matéria de ednl | dicas_ednl.pdf | 4° período, EDNL  | Erro ao criar repositório: preencha todos os campos obrigatórios.| - | - |
| Infoweb | - | Um repositório para guardar as provas da matéria de PDS | provas.mp4 | 3° Período, PDS  | Erro ao criar repositório: Tipo de arquivo não é permitido.| - | - |
| Tads | EDNL: repositório com dicas, materiais e suporte para estudar e entender melhor a matéria  | Um repositório com dicas sobre a matéria de ednl | dicas_ednl.pdf | 4° período, EDNL  | Erro ao criar repositório, título não pode ser maior que 100 caracteres.| - | - |
| Tads | EDNL: repositório com dicas, materiais e suporte para estudar e entender melhor a matéria  | Repositório criado para apoiar os estudos da disciplina de Estruturas de Dados e Níveis Lógicos (EDNL). Contém materiais de apoio, resumos, dicas práticas, exemplos de exercícios, explicações de algoritmos e arquivos complementares, servindo como guia para reforçar o aprendizado | dicas_ednl.pdf | 4° período, EDNL  | Erro ao criar repositório, a descrição não pode ser maior que 255 caracteres.| - | - |


#### Fluxo Principal - Ler repositório
Repositório | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- |  ------------- |  ------------- | 
| -  | Retorna o repositório e as informações dele.  | - |- 
|-   | Erro ao carregar repositório: repositório não encontrado.  | - | -
| -  |  Erro ao carregar repositório: você não segue nenhum usuário.  | - | -
| -  |  Erro ao carregar repositório: você não segue nenhuma comunidade.  | - | -

#### Fluxo Principal - Deletar repositório
id do repositório | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- | ------------- | -------------
| 01 | Repositório deletado com sucesso!| - | - |
| 1250 | | Erro ao deletar reposistório: repositório não encontrado.| - | - |
| 50 | | Erro ao deletar reposistório: para deletar o repositório é necessário ser dono do mesmo.| - | - |


#### Fluxo Principal - Atualizar repositório
Comunidade  | Título  | Descrição | Arquivo | Categoria | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- | ------------- | ------------- | ------------- |------------- |  ------------- |  ------------- | 
| Redes de computadores | PPC de redes de computadores | Um repositório para o curso de Redes do IFRN | ppc_redes.pdf  | 1° período, Introdução a redes  | Repositório atualizado com sucesso! | -  | - |
| - | PPC de redes de computadores | Um repositório para o curso de Redes do IFRN | ppc_redes.pdf  | 1° período, Introdução a redes  | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Tads | - | Um repositório para o curso de Tads do IFRN | ppc_tads.pdf  | 1° período | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Redes de computadores | Guia devops | Um repositório com algumas dicas para quem tem interesse em ser devops | -  | 1° período  | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Tads | Guia para sistemas digitais | Um repositório para o curso de Tads do IFRN com algumas dicas para a matéria de sistemas digitais | sistemas_digitais_tads.pdf  | - | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Infoweb | Infoweb: repositório com provas gerais, materiais de estudo e recursos para a matéria de desenvolvimento | - | provas_gerais.pdf  | Web design, PDS | Erro ao atualizar repositório: o título não pode ter mais de 100 caracteres. | -  | - |
| Infoweb | Infoweb: repositório com provas gerais e materiais de estudo  | - | provas_gerais.mp4  | Web design, PDS  | Erro ao atualizar repositório: o tipo de arquivo não é permitido. | -  | - |
| Tads | Explicando algoritmos  | Repositório criado para auxiliar os estudos em Algoritmos, com foco em lógica de programação. Contém exercícios resolvidos, dicas práticas, exemplos de código e materiais que facilitam a compreensão de estruturas condicionais, repetições, vetores e funções | algoritmos.pdf  | 2° Período, algoritmos  | Erro ao atualizar repositório: a descrição não pode ter mais de 255 caracteres. | -  | - |