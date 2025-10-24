# Planejamento do Escopo do Projeto


## 1. Objetivo SMART do Projeto

**Específico**: Desenvolver uma plataforma web estilo rede social voltada à integração acadêmica entre calouros e veteranos da DIATINF.

**Mensurável**: O sistema deve estar em funcionamento, com pelo menos 90% das funcionalidades principais operando conforme o planejado e disponível na rede pública durante o período de testes, considerando as limitações de tempo de uso da infraestrutura AWS Educate.

**Atingível**: O projeto será desenvolvido pelos discentes sob orientação dos docentes responsáveis, utilizando as tecnologias React, DjangoRest, Postgres, Docker e AWS .

**Relevante**: Supre as demandas das disciplinas e oferece à comunidade da DIATINF um serviço gratuito e estável para troca de conhecimento e integração acadêmica.

**Temporal**: Concluir o desenvolvimento da versão coorporativa até o fim do semestre letivo (??/02/2026)


## 2. Declaração do Escopo

### Escopo do Projeto

- Cadastro e autenticação de usuários (e-mail/senha; Google como alternativa).
- Perfil de usuário (foto, bio, formações, repositórios, favoritos).
- Feed principal (postagens de usuários seguidos e recomendações).
- Postagens com texto/imagem (criar/editar/excluir).
- Comentários em postagens.
- Curtidas em postagens.
- Repositórios para upload de arquivos (criação/edição/exclusão).
- Favoritar repositórios.
- Comunidades (criar, editar, visualizar).
- Sistema de categorias/tags (tecnologia, matéria, período, curso).
- Busca por palavras-chave e filtro por categorias.
- Moderação: denúncias, painel de denúncias e gerenciamento de papéis.
- Painel administrativo para criação/remoção de comunidades e categorias.

### Fora do Escopo

- Aplicativo móvel nativo (iOS/Android).
- Chat em tempo real com WebSocket (instant messaging).
- Integração com redes sociais para login além do Google.
- Integrações pagas com serviços externos.
- Recursos avançados de gamificação (badges complexos, níveis pagos).


## 3. Estrutura Analítica do Projeto (EAP)
## Diagrama de Fluxo - Projeto Bizzu

## 4. Dicionário da EAP
| Código | Termo Técnico | Descrição |
|--------|--------------------|-----------------------------------------------------------------------------|
| 1.5 | Design e Prototipagem | Criação de protótipos visuais e fluxos do sistema, definindo a interface e experiência do usuário. |
| 1.6 | Desenvolvimento Backend | Implementação da lógica do sistema, modelagem de dados e criação de APIs. |
| 1.7 | Desenvolvimento Frontend | Construção da interface do usuário e integração com o backend. |
| 2.4 | Manual do Usuário / Notion | Criação de documentação técnica e orientações de uso do sistema. |
| 3.1 | Planejamento da implantação | Definição da estratégia de deploy, escolha do provedor de cloud e arquitetura de implantação. |
| 3.2 | Deploy e testes de infraestrutura | Publicação do backend e frontend, configuração do banco remoto e testes de desempenho. |
| 4.1 | Especificação dos casos de teste | Planejamento dos testes, identificação de módulos críticos e definição de critérios. |
| 4.2 | Testes de unidade | Execução de verificações automatizadas em pequenas partes do código. |
| 4.3 | Análise heurística (Lista Eureca) | Avaliação da interface com base em princípios de usabilidade reconhecidos. |
| 4.4 | Análise empírica / Teste de usabilidade | Testes com usuários reais para avaliar a experiência e registrar melhorias. |

