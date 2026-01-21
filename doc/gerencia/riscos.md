# Plano de gerenciamento de riscos

## Histórico de Revisões

|    Data    | Versão |                           Descrição                           |  Autores  |
| :--------: | :----: | :-----------------------------------------------------------: | :-------: |
| 05/11/2025 |  1.0   |                        Versão inicial                         | Ana Maria |
| 12/11/2025 |  2.0   | Revisão da definição dos riscos e inclusão de planos de ações | Ana Maria |

# 1. Planos de definição dos riscos

Para a definição dos principais riscos do projeto Bizzu foram considerados passos:

> 1. Coleta de possíveis riscos<br>
   Foram utilizadas múltiplas fontes de informação:
   - Opinião dos desenvolvedores por meio de reuniões de equipe.
   - Análise dos requisitos funcionais e não funcionais do sistema.
   - Revisão de atas de reunião e relatórios de entregas.
  <br>

> 2. Definição de estratégias<br>

> 3. Atribuição de um nível de impacto e risco de ocorrer<br>
   Para cada risco foram atribuídas estratégias conforme o PMBOK: eliminar, mitigar, transferir ou explorar.<br>

> 4. Análise qualitativa <br>
   Foi utilizada a técnica 20/60/20 para equilibrar a distribuição entre riscos graves, médios e leves. Cada risco recebeu avaliação de impacto (Grave, Médio, Leve) e probabilidade de ocorrência (Alta, Normal, Baixa).

> 5. Atribuição de status <br>
   Os riscos foram classificados em:

| Status      | Significado                                            |
| ----------- | -----------------------------------------------------  | 
| Não Ocorreu | Não mais riscos de ocorrer no projeto.                 |    
| Monitorando | Risco que ainda há possibilidade de ocorrer no projeto.|     
| Resolvido   | Risco não mais aplicável ao projeto.                   |

# 2. Gerenciamento de riscos

| ID  | Descrição                                                                                                                                                  | Quem apontou o risco  | Impacto  | Riscos de ocorrer | Estratégia            | Forma de executar a estratégia                                                               | Status      | Custo      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------- | ----------------- | --------------------- | -------------------------------------------------------------------------------------------- | ----------- | ----------- |
| R1  | Problemas de segurança com a existência de falhas de autorização que permitem em casos especiais um possível vazamento de informações sensiveis do usuário | Ana Maria - @namariaa | Grave    | Alto              | Eliminar              | Adicionar verificações rigidas de dois fatoresm caso de incidente, acionar plano de resposta com suporte jurídico e técnico especializado. | Monitorando      | R$  10.000,00 - valor destinado à contratação de uma empresa especializada em segurança da informação, que ficará responsável por realizar testes de penetração, implementar autenticação multifator, apoiar na gestão de incidentes e garantir conformidade com a LGPD. |
| R2  | Nuvem AWS ficar paga                                                                                                                                       | Ana Maria - @namariaa | Grave    | Baixo             | Mitigar               | Configurar alertas de billing e avaliar alternativas de nuvem                                | Monitorando      | R$ 328,56 - Alternativa paga da AWS que cobre os custos mensais necessários |
| R3  | Descoberta de Dependência                                                                                                                                  | Ana Maria - @namariaa | Grave    | Baixo             | Mitigar               | Migrar a utilização para outra ferramenta.  | Monitorando      | R$ 14.000,00 - Custo de um programador pleno para a migração para a nova tecnologia | 
| R4  | Degradação de Performance                                                                                                                                  | Ana Maria - @namariaa | Médio    | Alto              | Eliminar e transferir | Otimizar código e infraestrutura ou utilização de desenvolveres temporários mais experientes | Monitorando | R$ 6.000,00 - Em casos da contratação de desenvolvedores mais experientes em arquitetura e otimização. | 
| R5  | Atraso em alguma entrega                                                                                                                                   | Ana Maria - @namariaa | Médio    | Alto              | Mitigar               | Acompanhar progresso semanal                                                                 | Monitorando      | R$ 0,00 - Reuniões semanais não trariam custos financeiros extras para o projeto |
| R6  | Falta de engajamento dos envolvidos                                                                                                                        | Ana Maria - @namariaa | Médio    | Normal            | Mitigar               | Envolver desenvolvedores em reuniões e cobrança de relatórios de progresso                   | Monitorando      | R$ 0,00 - Reuniões semanais não trariam custos financeiros extras para o projeto | 
| R7  | Github ficar fora do ar                                                                                                                                    | Fábio - @Fabioasl     | Médio    | Baixo             | Eliminar              | Usar ferramentas alternativas (GitLab, Bitbucket, Mercurial)                                 | Monitorando      |  R$ 0,00 - As demais alternativas de ferramentas são gratuitas assim com o github |
| R8  | Falha de comunicação entre equipe                                                                                                                          | Ana Maria - @namariaa | Médio    | Normal            | Mitigar               | Reuniões semanais                                                                            | Aberto      | R$ 0,00 - Reuniões semanais não trariam custos financeiros extras para o projeto |
| R9 | Máquina quebrar                                                                                                                                            | Ana Maria - @namariaa | Leve     | Normal            | Mitigar               | Ter máquinas reserva ou acesso remoto                                                        | Monitorando      | R$ 270,00 - O custo médio de um aluguel diário de um computador é de 9,00 resultando em um gasto de 270 por um mês de uso até o momento de uma solução definitiva |
| R10 | Obrigatoriedade de utilização de uma nova tecnologia                                                                                                                      | Ana Maria - @namariaa | Leve     | Normal            | Explorar e mitigar    | Necessidade de Treinamento Urgente  por meio de matérias gratuitos da internet e usar mentoria entre membros                        | Monitorando      | R$ 0,00 - A solução do risco não conta com gastos extras |
| R11 | Afastamento de algum membro                                                                                                                                | Ana Maria - @namariaa | Leve     | Baixo             | Mitigar               | Promover trabalho em pares                                                                   | Monitorando      | R$ 0,00 - A solução do risco não conta com gastos extras |
| R12 | Licença estudante do figma não ser suficiente                                                                                                              | Ana Maria - @namariaa | Leve     | Baixo             | Transferir            | Mapear necessidades antecipadamente e usar versões open-source                               | Monitorando      | R$ 135,25 - Valor de um plano pro intermediário que cubrisse todas as necessidades. |

# 3. Planos de Ação para Riscos de Alto Impacto <br>

Os riscos classificados como Grave/Alto ou Médio/Alto receberam planos de ação detalhados: <br>

| ID  | Descrição                                                                 | Impacto | Probabilidade | Plano de Ação                                                                                                                                                      | Prazo    | Custo |
| --- | ------------------------------------------------------------------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------- |
| R1  | Falhas de autorização que podem causar vazamento de informações sensíveis | Grave   | Alto          | Implementar auditoria de segurança contínua, Adotar autenticação multifator                                                                                        | 30 dias  | R$  10.000,00 |
| R4  | Degradação de performance                                                 | Médio   | Alto          | Revisar arquitetura do sistema, Implementar monitoramento de desempenho em tempo real, Contratar consultoria externa para otimização                               | 45 dias  | R$ 6.000,00 |  
| R5  | Atraso em entregas                                                        | Médio   | Alto          | Estabelecer cronograma detalhado com marcos semanais, Implementar ferramenta de acompanhamento (Notion/Trello), Criar plano de contingência para recursos críticos | Imediato | R$ 0,00 |
