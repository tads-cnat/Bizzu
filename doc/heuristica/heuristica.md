# Avaliação Heurística

**Histórico de Alterações:**
| Versão | Autor | Data |
|--------|-------|------|
| 1.0 | Jesrriel Moura | 30 de outubro de 2025 |
| 2.0 | Ana Maria | 08 de novembro de 2025 |

## 1 Introdução

O presente relatório descreve o processo de aplicação da técnica Eureca na análise da
interface do sistema Bizzu. Diferentemente de abordagem original da técnica, que avalia
protótipos de baixa ou média fidelidade, neste estudo a técnica foi aplicada diretamente
sobre o site já implementado.O objetivo da aplicação da técnica foi identificar problemas de
usabilidade, inconsistências de design e possíveis melhorias na interação do usuário com o
sistema, com base com base nas heurísticas Eureca (Matos & Freire).

## 2 Equipe Avaliadora

A avaliação foi conduzida pelos membros da equipe de PDS.
● Jesrriel Moura
● Luiz Fernando
● Luiz Roberto
● Ana Maria
● Fábio Alexandre
Todos os participantes possuem familiaridade com princípios de design e desenvolvimento
de interfaces, o que contribuiu para análises mais precisas e técnicas.

## 3 Metodologia

A técnica Eureca é uma variação estruturada da avaliação heurística, que busca
sistematizar o processo de identificação e classificação de problemas de usabilidade em
interfaces digitais. No caso da interface Bizzu, as etapas foram adaptadas para o contexto
do sistema já implementado.
Etapas realizadas:
**3.1 Definição do escopo**
Foi definido que a análise abrangeria as principais seções do site Bizzu, incluindo os casos
de uso de: Ver feed; Acessar perfil; Manter postagem(crud); Manter repositório(crud);
**3.2 Seleção dos avaliadores**
Todos os avaliadores do grupo foram previamente apresentados à técnica Eureca e aos
critérios heurísticos utilizados.
**3.3 Avaliação individual**
Cada avaliador navegou pelo site e registrou individualmente os problemas de usabilidade
observados, de acordo com as heurísticas predefinidas.

Avaliação individual de Jesrriel Moura (https://docs.google.com/document/d/1lWJBR_G7x4AZO-XDpDFOh9uhKObl_kDpukrrOXJG0S4/edit?tab=t.0)
Avaliação individual de Ana Maria(https://docs.google.com/document/d/1qFEcMAwa7g9IxXBH3h77jmsSkaXh9DXD4SOEMxAN7c8/edit?tab=t.0)
Avaliação individual de Fábio Alexandre (https://docs.google.com/document/d/1b25Zc6Hoy-jtHc91OYZMlctgojmON9vWReyXHRU_X8k/edit?tab=t.0)
Avaliação individual de Luiz Roberto (https://docs.google.com/document/d/1656WnVOSNcFD-b8m-evAfXOGVrUEpx-XG1eW1USaqg8/edit?usp=sharing)
Avaliação individual de Luiz Fernando (https://docs.google.com/document/d/1j7rl6_-cQFJe9WJLkOYAGiex5r1AJ2eeA816IHOmrY4/edit?tab=t.0)

**3.4 Reunião de consolidação**
Após as análises individuais, foi realizado um forms para tornar unânime a classificação de problemas quanto à severidade e frequência.

**3.5 Documentação dos resultados**
Os problemas identificados foram compilados em um relatório conjunto, com sugestões de melhoria para cada um deles.

## 4 Avaliação em Grupo

| N°                                                     | Problema                           | Princípios violados | Sugestão | Gravidade | Esforço |
| ------------------------------------------------------ | ---------------------------------- | ------------------- | -------- | --------- | ------- |
| 01 | Menu de opções (três pontos) exibe “Editar/Excluir” mesmo em postagens de outros usuários | AF1 – Funcionalidade |Exibir “Denunciar” para postagens de terceiros e “Editar/Excluir” apenas para as próprias postagens. | Alta | Moderado |
| 02 | Postagens listadas das mais antigas para as mais novas | FM4 – Ordenação da informação / FM5 – Consistência externa |Exibir postagens mais recentes primeiro, em ordem cronológica inversa.| Alta | Leve |
| 03 | Imagens das postagens sem tamanho padrão | FM14 – Formatação de imagens|Definir altura máxima para imagens e permitir expandir com clique.| Baixa | Leve |
| 04 | Fotos de perfil quebradas ou distorcidas | FM14 – Formatação de imagens / AF9 – Prevenção de erros| Mostrar avatar
padrão em caso de falha no carregamento. | Média | Leve |
| 05 | Botão “Cancelar” apaga informações sem confirmação | AF4 –
Recuperação de dados perdidos | Exibir modal de
confirmação antes de descartar alterações. | Baixa | Leve |
| 06 | Modal de exclusão não reabre sem recarregar a página | AF1 – Funcionalidade | Corrigir lógica para permitir múltiplas aberturas/fechamentos. | Média | Moderado |
| 07 | Criação de postagem/repositório exige muitos cliques | NA5 – Mínimo de cliques / PU4 –Redução do esforço cognitivo | Adicionar botão direto de criação no feed principal. | Média | Leve |
| 08 | Lista de comunidades/repositórios mostra itens não seguidos | AF10 – Restrições / FM3 – Filtragem da informação | Filtrar para mostrar apenas comunidades/usuários seguidos. | Média | Moderado |
| 09 | Alinhamento inconsistente em botões, títulos e campos | FM9 – Alinhamento | Padronizar margens e espaçamento entre títulos, botões e formulários. | Baixa | Leve |
| 10 | Botão “+ Novo” é genérico e causa ambiguidade | PU4 –
Redução do esforço cognitivo / NA5 – Mínimo de cliques | Alterar rótulo para “+ Nova Postagem” ou “+ Novo Repositório”. | Média | Leve |
| 11 | Ausência de widget ou opção de acessibilidade visível | AC6 – Destaque das configuraç ões de acessibilidade| Incluir botão flutuante de acessibilidade (ajuste de contraste, fonte etc.). | Alta | Grande |
| 12 | Contraste de textos insuficiente | FM11 – Contraste / AC4 – Contraste de cor | Aumentar contraste entre texto e fundo, seguindo padrões de acessibilidade. | Média | Leve |
| 13 | Falta de affordance (ícones ou dicas) para edição de informações |CO3 – Affordance – dicas| Inserir ícones de edição (lápis/“+”) próximos aos campos editáveis.| Média | Leve |
| 14 | Repositório não atualiza lista de arquivos após edição |AF1 –Funcionalidade | Atualizar automaticamente a lista de arquivos após alterações.| Média | Moderado |
| 15 |Placeholder genérico em campos de criação de postagens e repositórios | AF6 – Sugestão de preenchimento | Tornar o placeholder mais criativo e inspirar o usuário (ex: “Compartilhe o que aprendeu hoje...”).| Baixa | Leve |
| 16 |Formulários e botões desalinhados em relação aos campos| FM9 – Alinhamento | Corrigir alinhamento entre campos, botões e títulos para manter harmonia visual.| Baixa | Leve |
| 17 | Zoom quebra layout nos formulários de criação | AC5 –
Possibilidade de ampliação | Adaptar o sistema para funcionar corretamente em diferentes níveis de zoom. | Alta | Grande |
| 18 | Ausência de tela de carregamento no feed | FM16 – Tela
de carregamento / CO2 – Feedback adequado | Adicionar spinner ou
loader durante o carregamento das postagens. | Média | Moderado |
| 19 | Breadcrumbs (migalhas de pão) ausentes nas telas de navegação | NA4 – Migalhas de pão | Adicionar trilha de
navegação para indicar o caminho percorrido e facilitar retorno. | Média | Moderado |
| 20 | Campo “Categorias” indica obrigatoriedade com * mas sem explicação | CO3 – Affordance – dicas | Inserir legenda
explicando que campos com * são obrigatórios. | Baixa | Leve |


### Listagem de imagens correspondentes aos erros encontrados



