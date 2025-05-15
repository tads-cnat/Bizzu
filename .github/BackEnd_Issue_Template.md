# Implementação Back-End 

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
Além da criação do endpoint é necessário fazer a integração com o frontend juntamente com o responsável pelo mesmo.
Você precisará criar:

- [ ] Model sem relacionamento (pois isso será implementado futuramente)
- [ ] Serializer 
- [ ] View 
- [ ] URL

A ordem posta acima é importante para uma boa implementação. Além disso, padrões devem ser seguidos para que assim o projeto fique consistente como:
- Cada entidade do nosso sistema terá um arquivo separado onde dentro desse arquivo terá uma classe que leva o mesmo nome do arquivo
- Todos os elementos do CRUD são funções que ficam dentro da classe mas as classes do DRF já possuem essas operações de CRUD por padrão você só precisa acessar o endpoint
- Use o modelviewset 
