# Documento de Escopo do Projeto - Bizzu

## 1. Introdução

O presente Documento de Escopo descreve, de forma estruturada, o que será entregue pelo **Projeto Bizzu** — uma plataforma web estilo rede social voltada à integração acadêmica entre calouros e veteranos da DIATINF. Este documento define o Escopo do Produto, o Escopo do Projeto, as entregas, exclusões, critérios de aceitação, restrições, premissas e o processo de controle de mudanças.

## 2. Justificativa do Projeto

Estudantes novatos enfrentam dificuldades de integração com novos conteúdos, disciplinas e colegas, o que impacta o desempenho acadêmico. O Bizzu tem por objetivo facilitar a socialização, a troca de materiais e a colaboração entre alunos por meio de comunidades, repositórios e feed de postagens — conforme detalhado no Documento de Visão do projeto.

## 3. Objetivos

### 3.1 Objetivo Geral

Desenvolver uma plataforma web que conecte estudantes (calouros e veteranos) para troca de conhecimento, arquivos e suporte acadêmico.

### 3.2 Objetivos Específicos

- Permitir criação e manutenção de perfis pessoais
- Fornecer comunidades por curso e matérias
- Implementar postagem, comentário e curtidas em um feed
- Disponibilizar repositórios pessoais para upload/compartilhamento de materiais
- Implementar funcionalidades de moderação e denúncia
- Permitir autenticação por e-mail/senha e via SUAP (opcional/integrada)

## 4. Escopo do Produto

O produto final será um **Web App responsivo** com as funcionalidades abaixo (baseadas nos requisitos identificados):

### Funcionalidades Principais

| Categoria | Funcionalidades |
|-----------|----------------|
| **Autenticação** | Cadastro e login via e-mail/senha; Google como alternativa |
| **Perfil** | Foto, bio, formações, repositórios, favoritos |
| **Feed** | Postagens de usuários seguidos e recomendações |
| **Postagens** | Criar/editar/excluir com texto/imagem |
| **Interações** | Comentários e curtidas em postagens |
| **Repositórios** | Upload, criação, edição e exclusão de arquivos |
| **Favoritos** | Favoritar repositórios |
| **Comunidades** | Criar, editar e visualizar comunidades |
| **Organização** | Sistema de categorias/tags (tecnologia, matéria, período, curso) |
| **Busca** | Por palavras-chave e filtro por categorias |
| **Moderação** | Denúncias, painel de denúncias e gerenciamento de papéis |
| **Administração** | Painel para criação/remoção de comunidades e categorias |

### Stack Tecnológica

| Componente | Tecnologia |
|------------|-----------|
| **Backend** | Python (Django REST Framework) |
| **Banco de Dados** | PostgreSQL |
| **Frontend** | React + TypeScript + Tailwind CSS |
| **Containerização** | Docker |

## 5. Escopo do Projeto

Principais atividades para entregar o produto:

1. Planejamento do projeto (TAP, cronograma, equipes)
2. Levantamento de requisitos detalhados (Revisão do Documento de Visão)
3. Prototipagem e UX/UI no Figma
4. Arquitetura e definição do banco de dados
5. Implementação do backend (APIs REST)
6. Implementação do frontend (componentes, responsividade)
7. Implementação de testes (unitários, integração, E2E)
8. Integração e infraestrutura (CI/CD, containers)
9. Homologação, testes de aceitação e correções
10. Entrega, documentação e treinamento (se aplicável)
11. Encerramento e lições aprendidas

## 6. Entregas Principais (Deliverables)

| ID | Entrega | Descrição |
|----|---------|-----------|
| **D01** | Documento de Requisitos | Requisitos funcionais e não funcionais |
| **D02** | Protótipos de telas | Figma |
| **D03** | API Backend | Documentada com Swagger/OpenAPI |
| **D04** | Frontend funcional | Deploy em ambiente de nuvem |
| **D05** | Banco de dados | Scripts de migração incluídos |
| **D06** | Plano de Testes | Plano e resultados |
| **D07** | Manual de implantação | README, scripts Docker |
| **D08** | Documentação do usuário | Guia rápido |
| **D09** | Relatório final | Relatório e Termo de Aceite |

## 7. Exclusões

Para evitar *scope creep*, o seguinte **NÃO** faz parte do MVP:

- ❌ Aplicativo móvel nativo (iOS/Android)
- ❌ Chat em tempo real com WebSocket (instant messaging)
- ❌ Integração com redes sociais além do Google
- ❌ Integrações pagas com serviços externos
- ❌ Recursos avançados de gamificação (badges complexos, níveis pagos)

## 8. Critérios de Aceitação

Cada entrega deverá atender a critérios claros para ser aceita:

### Critérios Gerais

| Critério | Descrição |
|----------|-----------|
| **Conformidade** | Funcionalidade implementada conforme D01 (Documento de Requisitos) |
| **Testes** | Testes unitários com cobertura mínima definida |
| **Documentação** | API documentada e funcional em ambiente de nuvem |
| **Responsividade** | Frontend responsivo e acessível |
| **Validação** | Demonstração em sessão com stakeholders |
| **Aceite Formal** | Assinatura do termo de aceite |

## 9. Requisitos

### 9.1 Requisitos Funcionais

| ID | Requisito | Descrição |
|----|-----------|-----------|
| **F01** | Upload de arquivos | Em repositórios |
| **F02** | Classificação | Categorias de postagens |
| **F03** | Comentários | Em postagens |
| **F04** | Cadastro de usuário | Registro na plataforma |
| **F05** | Manutenção de perfil | Edição de dados pessoais |
| **F06** | Publicação de postagens | Criar posts no feed |
| **F07** | Publicação de repositório | Compartilhar materiais |
| **F08** | Autenticação SUAP | Login via sistema acadêmico |
| **F09** | Favoritar repositório | Salvar repositórios de interesse |
| **F10** | Seguir | Perfis e comunidades |
| **F11** | Curtir postagem | Interação com posts |
| **F12** | Filtragem | Por categorias |
| **F13** | Logout | Encerrar sessão |
| **F14** | Busca | Por palavras-chave |
| **F15** | Visualização | De comunidades |
| **F16** | Monitoramento | De denúncias (moderador) |
| **F17** | Realização | De denúncias (usuário) |
| **F18** | Login | Autenticação na plataforma |
| **F19** | Criação de categorias | Papel de moderador |
| **F20** | Solicitação de papel | Mudança de permissões |
| **F21** | Gerenciamento de papéis | Controle de permissões |
| **F22** | Manter comunidades | Administrador |

### 9.2 Requisitos Não-Funcionais

| ID | Categoria | Descrição |
|----|-----------|-----------|
| **NF01** | Stack tecnológica | Python (Django REST), PostgreSQL, React + TypeScript + Tailwind, Docker |
| **NF02** | Usabilidade | Interface intuitiva, navegabilidade clara |
| **NF03** | Consistência | Visual e de interação |
| **NF04** | Compatibilidade | Chrome, Edge, Firefox (navegadores modernos) |
| **NF05** | Autenticação | Segura, autorização por papéis |
| **NF06** | Acessibilidade | Descritivos de imagens, tamanhos de fonte adequados |
| **NF07** | Responsividade | Desktop, tablet, celular |
| **NF08** | Segurança | Proteção contra XSS, CSRF, SQL injection; HTTPS |
| **NF09** | Performance | Tempo de resposta aceitável para operações críticas |

## 10. Restrições

- ⏱️ Prazo do semestre/cronograma definido pela disciplina (TAP)
- 🛠️ Ferramentas obrigatórias: Django, React, PostgreSQL, Docker
- 👥 Disponibilidade limitada de recursos humanos (equipe = estudantes)
- 🖥️ Ambiente de testes provido pelo grupo/IFRN (se aplicável)

## 11. Premissas

- ✅ Stakeholders participarão das revisões e validações nas datas agendadas
- ✅ A equipe terá acesso a repositório Git e ambiente para CI/CD
- ✅ Mudanças de escopo serão tratadas via decisão da equipe e orientador

## 12. Riscos Relacionados ao Escopo

| Risco | Mitigação |
|-------|-----------|
| **Scope creep** | Estabelecer baseline e CCB (Change Control Board) |
| **Dependência de autenticação externa** | Fallback de login padrão |
| **Falta de tempo para recursos avançados** | Priorização do MVP |
| **Questões de segurança em uploads** | Validação e políticas de tamanho/tipo |

## 13. Estrutura Analítica do Projeto (EAP/WBS)

```
1.0 Projeto Bizzu
│
├── 1.1 Planejamento
│   ├── 1.1.1 TAP (Termo de Abertura do Projeto)
│   └── 1.1.2 Plano de Gerenciamento do Projeto
│
├── 1.2 Levantamento de Requisitos
│   ├── 1.2.1 Workshops com stakeholders
│   └── 1.2.2 Documento de Requisitos
│
├── 1.3 Design e Prototipagem
│   ├── 1.3.1 Protótipos Figma
│   └── 1.3.2 Guia de estilo / Design System
│
├── 1.4 Desenvolvimento Backend
│   ├── 1.4.1 Modelagem de dados
│   └── 1.4.2 APIs
│
├── 1.5 Desenvolvimento Frontend
│   ├── 1.5.1 Layout e componentes
│   └── 1.5.2 Integração com APIs
│
├── 1.6 Testes
│   ├── 1.6.1 Testes unitários
│   ├── 1.6.2 Testes de integração / E2E
│   └── 1.6.3 Testes de aceitação
│
├── 1.7 Implantação e Infraestrutura
│   ├── 1.7.1 Docker / CI/CD
│   └── 1.7.2 Deploy
│
├── 1.8 Entregas e Documentação
│   ├── 1.8.1 Documentação técnica
│   ├── 1.8.2 Manual do usuário
│   └── 1.8.3 Relatório final
│
└── 1.9 Encerramento
    ├── 1.9.1 Lições aprendidas
    └── 1.9.2 Arquivamento
```

## 14. Dicionário da EAP (Exemplos)

### Item 1.4.1 — Modelagem de Dados

| Atributo | Descrição |
|----------|-----------|
| **ID** | 1.4.1 |
| **Nome** | Modelagem de Dados |
| **Descrição** | Modelagem conceitual e lógica do banco (entidades: usuário, postagem, comentário, repositório, comunidade, categoria, denúncia) |
| **Responsável** | Backend lead |
| **Critério de Aceitação** | Diagrama ER aprovado e scripts de migração funcionando em ambiente local/staging |
| **Dependências** | Documento de Requisitos (1.2.2) |
| **Estimativa** | A preencher |

### Item 1.5.2 — Integração com API

| Atributo | Descrição |
|----------|-----------|
| **ID** | 1.5.2 |
| **Nome** | Integração com API |
| **Descrição** | Implementar chamadas do frontend, tratamento de erros e estados de carregamento |
| **Responsável** | Frontend lead |
| **Critério de Aceitação** | Fluxos aprovados em testes de aceitação: login, criar post, upload repositório |
| **Dependências** | APIs Backend (1.4.2) |
| **Estimativa** | A preencher |

## 15. Validação e Aprovação do Escopo

As entregas serão validadas conforme os **Critérios de Aceitação** e homologadas em sessões com stakeholders (estudantes representantes e professor orientador).

O aceite final será formalizado por assinatura do **Termo de Aceite**.

### Aprovação

| Nome | Papel | Assinatura | Data |
|------|-------|------------|------|
|      |       |            |      |
|      |       |            |      |
|      |       |            |      |
|      |       |            |      |

## 16. Referências

- Documento de Visão do Projeto Bizzu e demais documentações
- Slides: Gerenciamento do Escopo do Projeto — base PMBOK 6ª ed. (prof. Alan Glei)
- Slides: 003-GP-ESCOPO.pptx (prof. Alan Glei)

---

**Documento elaborado para o Projeto Bizzu - DIATINF**