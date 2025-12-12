# Plano de gerenciamento de riscos

## Histórico de Revisões

|    Data    | Versão |                           Descrição                           |  Autores  |
| :--------: | :----: | :-----------------------------------------------------------: | :-------: |
| 05/11/2025 |  1.0   |                        Versão inicial                         | Ana Maria |
| 12/11/2025 |  2.0   | Revisão da definição dos riscos e inclusão de planos de ações | Ana Maria |

# 1. Planos de definição dos riscos

Para a definição dos principais riscos do projeto Bizzu foram considerados passos:

1. Coleta de possíveis riscos<br>
   Foram utilizadas múltiplas fontes de informação:

- Opinião dos desenvolvedores por meio de reuniões de equipe.
- Análise dos requisitos funcionais e não funcionais do sistema.
- Revisão de atas de reunião e relatórios de entregas.
  <br>

2. Definição de estratégias<br>

3. Atribuição de um nível de impacto e risco de ocorrer<br>
   Para cada risco foram atribuídas estratégias conforme o PMBOK: eliminar, mitigar, transferir ou explorar.<br>

4. Análise qualitativa <br>
   Foi utilizada a técnica 20/60/20 para equilibrar a distribuição entre riscos graves, médios e leves. Cada risco recebeu avaliação de impacto (Grave, Médio, Leve) e probabilidade de ocorrência (Alta, Normal, Baixa).

5. Atribuição de status <br>
   Os riscos foram classificados em:

| Status      | Significado                                           |
| ----------- | ----------------------------------------------------- |
| Aberto      | Risco não mais aplicável ao projeto.                  |
| Monitorando | Risco em análise ou com alta probabilidade/gravidade. |                                              | Ana Maria - @namariaa | Médio   | Alto              | Eliminar              | Adicionar verificações de email que estão rea
| Reoslvido   | Risco não mais aplicável ao projeto.                  |

# 2. Gerenciamento de riscos

| ID  | Descrição                                                                                                                                                  | Quem apontou o risco  | Impacto | Riscos de ocorrer | Estratégia            | Forma de executar a estratégia                                                               | Status      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------- | ----------------- | --------------------- | -------------------------------------------------------------------------------------------- | ----------- |
| R1  | Problemas de segurança com a existência de falhas de autorização que permitem em casos especiais um possível vazamento de informações sensiveis do usuário | Ana Maria - @namariaa | Grave   | Alto              | Eliminar              | Adicionar verificações rigidas                                                               | Aberto      |
| R2  | Nuvem AWS ficar paga                                                                                                                                       | Ana Maria - @namariaa | Grave   | Baixo             | Mitigar               | Configurar alertas de billing e avaliar alternativas de nuvem                                | Aberto      |
| R3  | Descoberta de Dependência                                                                                                                                  | Ana Maria - @namariaa | Grave   | Baixo             | Mitigar               | Criar plano de contingência                                                                  | Aberto      |
| R4  | Degradação de Performance                                                                                                                                  | Ana Maria - @namariaa | Médio   | Alto              | Eliminar e transferir | Otimizar código e infraestrutura ou utilização de desenvolveres temporários mais experientes | Monitorando |
| R5  | Atraso em alguma entrega                                                                                                                                   | Ana Maria - @namariaa | Médio   | Alto              | Mitigar               | Acompanhar progresso semanal                                                                 | Aberto      |
| R6  | Falta de engajamento dos envolvidos                                                                                                                        | Ana Maria - @namariaa | Médio   | Normal            | Mitigar               | Envolver desenvolvedores em reuniões e cobrança de relatórios de progresso                   | Aberto      |
| R7  | Github ficar fora do ar                                                                                                                                    | Fábio - @Fabioasl     | Médio   | Baixo             | Eliminar              | Usar ferramentas alternativas (GitLab, Bitbucket, Mercurial)                                 | Aberto      |
| R14 | Problemas de segurança com a ausência de verificação no cadastro de usuários externos a instituição          lizando o cadastro                              | Aberto      |
| R9  | Falha de comunicação entre equipe                                                                                                                          | Ana Maria - @namariaa | Médio   | Normal            | Mitigar               | Reuniões semanais                                                                            | Aberto      |
| R10 | Máquina quebrar                                                                                                                                            | Ana Maria - @namariaa | Leve    | Normal            | Mitigar               | Ter máquinas reserva ou acesso remoto                                                        | Aberto      |
| R11 | Necessidade de Treinamento Urgente                                                                                                                         | Ana Maria - @namariaa | Leve    | Normal            | Explorar e mitigar    | Utilizar matérias gratuitos da internet e usar mentoria entre membros                        | Aberto      |
| R12 | Afastamento de algum membro                                                                                                                                | Ana Maria - @namariaa | Leve    | Baixo             | Mitigar               | Promover trabalho em pares                                                                   | Aberto      |
| R13 | Licença estudante do figma não ser suficiente                                                                                                              | Ana Maria - @namariaa | Leve    | Baixo             | Transferir            | Mapear necessidades antecipadamente e usar versões open-source                               | Aberto      |

# 3. Planos de Ação para Riscos de Alto Impacto <br>

Os riscos classificados como Grave/Alto ou Médio/Alto receberam planos de ação detalhados: <br>

| ID  | Descrição                                                                 | Impacto | Probabilidade | Plano de Ação                                                                                                                                                      | Prazo     |
| --- | ------------------------------------------------------------------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| R1  | Falhas de autorização que podem causar vazamento de informações sensíveis | Grave   | Alto          | Implementar auditoria de segurança contínua, Adotar autenticação multifator                                                                                        | 30 dias   |
| R4  | Degradação de performance                                                 | Médio   | Alto          | Revisar arquitetura do sistema, Implementar monitoramento de desempenho em tempo real, Contratar consultoria externa para otimização                               | 45 dias   |
| R5  | Atraso em entregas                                                        | Médio   | Alto          | Estabelecer cronograma detalhado com marcos semanais, Implementar ferramenta de acompanhamento (Notion/Trello), Criar plano de contingência para recursos críticos | Imediato  |
| R14 | Falhas de segurança no cadastro de usuários externos                      | Médio   | Alto          | Implementar verificação de e-mail institucional, Revisar políticas de acesso externo                                                                               | Imentiato |
