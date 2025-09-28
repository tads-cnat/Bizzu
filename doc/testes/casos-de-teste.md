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
| Tads | PPC de Tads | Um repositório para TADS | ppc.pdf  | Tecnologia  | Repositório criado com sucesso! | - | - |
| Infoweb | PPC de infoweb  | - | PPC.pdf   | Tecnologia  |  Repositório criado com sucesso! | - | - |
| Redes | PPC de redes| Um repositório para Redes | ppc.pdf  | -  | Erro ao criar repositório: preencha todos os campos obrigatórios. | -  | - |
| Infoweb | - | Um repositório para guardar as provas da matéria de web design | provas.pdf | Período, Matéria  | Erro ao criar repositório: preencha todos os campos obrigatórios.| - | - |
| - | Ajuda para EDNL  | Um repositório com dicas sobre a matéria de ednl | dicas_ednl.pdf | Período, Matéria  | Erro ao criar repositório: preencha todos os campos obrigatórios.| - | - |
| Infoweb | - | Um repositório para guardar as provas da matéria de web design | provas.mp4 | Período, Matéria  | Erro ao criar repositório: Tipo de arquivo não é permitido.| - | - |
| Tads | EDNL: repositório com dicas, materiais e suporte para estudar e entender melhor a matéria  | Um repositório com dicas sobre a matéria de ednl | dicas_ednl.pdf | Período, Matéria  | Erro ao criar repositório, título não pode ser maior que 100 caracteres.| - | - |


#### Fluxo Principal - Ler repositório
Comunidade  | Título  | Descrição | Arquivo | Categoria | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- | ------------- | ------------- | ------------- |------------- |  ------------- |  ------------- | 
Tads  | PPC de Tads  | Um repositório para TADS | ppc.pdf| Período | Retorna o repositório correto e todas as informações dele.  | - | -
Tads  | PPC de Tads  | Um repositório para TADS | ppc.pdf| Período | Erro ao carregar repositório: repositório não encontrado.  | - | -

#### Fluxo Principal - Deletar repositório
Comunidade  | Título  | Descrição | Arquivo | Categoria | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- | ------------- | ------------- | ------------- |------------- |  ------------- |  ------------- | 
| Infoweb | Provas de webdesign | Um repositório para guardar as provas da matéria de web design | provas.pdf | Período, Matéria  | Repositório deletado com sucesso!| - | - |
| Infoweb | Provas de webdesign | Um repositório para guardar as provas da matéria de web design | provas.pdf | Período, Matéria  | Erro ao deletar reposistório.| - | - |

#### Fluxo Principal - Atualizar repositório
Comunidade  | Título  | Descrição | Arquivo | Categoria | Resultado esperado | Resultado obtido | Situação 
| ------------- | ------------- | ------------- | ------------- | ------------- |------------- |  ------------- |  ------------- | 
| Redes de computadores | PPC de redes de computadores | Um repositório para o curso de Redes do IFRN | ppc_redes.pdf  | Tecnologia, Matéria  | Repositório atualizado com sucesso! | -  | - |
| Infoweb | Provas de infoweb | - | provas_gerais.pdf  | Matéria  | Repositório atualizado com sucesso! | -  | - |
| - | PPC de redes de computadores | Um repositório para o curso de Redes do IFRN | ppc_redes.pdf  | Tecnologia, Matéria  | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Tads | - | Um repositório para o curso de Tads do IFRN | ppc_tads.pdf  | Matéria | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Redes de computadores | Guia devops | Um repositório com algumas dicas para quem tem interesse em ser devops | -  | Tecnologia  | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Tads | Guia para sistemas digitais | Um repositório para o curso de Tads do IFRN com algumas dicas para a matéria de sistemas digitais | sistemas_digitais_tads.pdf  | - | Erro ao atualizar repositório: preencha todos os campos obrigatórios. | -  | - |
| Infoweb | Infoweb: repositório com provas gerais, materiais de estudo e recursos para a matéria de desenvolvimento | - | provas_gerais.pdf  | Matéria  | Erro ao atualizar repositório: o título não pode ter mais de 100 caracteres. | -  | - |
| Infoweb | Infoweb: repositório com provas gerais e materiais de estudo  | - | provas_gerais.mp4  | Matéria  | Erro ao atualizar repositório: o tipo de arquivo não é permitido. | -  | - |