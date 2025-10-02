---
name: FrontEnd_Issue_Template
about: Describe this issue template's purpose here.
title: ''
labels: ''
assignees: ''

---

# Implementação Front-End 

## :card_file_box: Título da Tarefa

Descrever em linhas gerais a tarefa

### Subtarefas
- [ ] Subtarefa 01 - Prazo: dd/mm/yyyy
- [ ] Subtarefa 02 - Prazo: dd/mm/yyyy

### :open_file_folder: Informações Gerais 

**Tempo previsto (em horas):**

**Tempo gasto (em horas):**

**Complexidade (baixa | média | alta):**

**Qualidade (baixa | média | alta):**

**Descrição**

### 📚 Observações importantes 
Além da criação da tela com suas funcionalidade é necessário fazer a integração com o backend juntamente com o responsável pelo mesmo.
Você precisará criar:
- [ ] Repostas a cada coisa que o usuário clicar se atentando a todos os possíveis fluxos dessa ação
- [ ] Arquivos axios que vão ser responsáveis por essa integração (service e um instance) 
A ordem posta acima é importante para uma boa implementação. Além disso, padrões devem ser seguidos para que assim o projeto fique consistente como:
- O baseServie e o axiosInstance ficam na pasta common mas os serviços específicos de cada entidade ficam em models
- O arquivo da página implementada deve estar em features.
