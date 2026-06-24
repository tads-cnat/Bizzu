# Planejamento do Escopo do Projeto - Etapa 02

## Histórico de Revisões

|    Data    | Versão |   Descrição    |   Autores    |
| :--------: | :----: | :------------: | :----------: |
| 11/12/2025 |  1.0   | Versão inicial | Luiz Roberto |

## 1. Objetivo SMART do Projeto - Etapa 02

**Específico**: Expandir e consolidar a plataforma web estilo rede social para integração acadêmica, implementando novas funcionalidades, melhorias de segurança, sistema robusto de testes automatizados (unitários, funcionais e de usabilidade), pipeline de Integração Contínua e orquestração de containers com Kubernetes baseadas no feedback da primeira etapa.

**Mensurável**: Implementar 100% das funcionalidades de melhoria definidas para esta etapa, com mínimo de 70% de cobertura de testes automatizados, e documentação completa de custos e riscos.

**Atingível**: O projeto será desenvolvido pelos discentes sob orientação dos docentes responsáveis, utilizando as tecnologias consolidadas na etapa anterior (React, DjangoRest, Postgres, Docker, Kubernetes, GitHub Actions e AWS).

**Relevante**: Aprimora a experiência do usuário, corrige problemas identificados na etapa 01, implementa infraestrutura de qualidade e DevOps profissional, e adiciona funcionalidades complementares solicitadas pelo docente responsável.

**Temporal**: Concluir o desenvolvimento das melhorias, refinamentos e documentação até fim de Janeiro de 2026

## 2. Entregáveis da Etapa 02

### Entregáveis de Desenvolvimento
1. **Manifests Kubernetes** - Arquivos YAML para deploy em cluster Kubernetes (desenvolvimento)
2. **Testes Automatizados** - Suite completa de testes (unitários, API, funcionais, performance)
3. **Integração contínua** - Integrar continuamente as novas funcionalidades e requisitos de qualidade

### Entregáveis de Documentação
11. **Cronograma** - Linha do tempo detalhada com marcos e entregas
12. **Gerenciamento de Riscos** - Estimativas de riscos, custos e recursos associados
13. **Gerenciamento de Custos** - Estimativas de horas, recursos e ROI
14. **Planejamento e realização de testes para API, Funcionais e não-Funcionais** - Plano de testes detalhado e resultados para cada categoria
15. **Relatório de Testes de Usabilidade** - Análise heurística e feedback de usuários reais
16. **Avaliação empírica** - Métricas de performance, cobertura de testes e qualidade de código de acordo com o que foi anotado pelos levantamento da própria avaliação


### Fora do Escopo da Etapa 02

- Aplicativo móvel nativo (iOS/Android).
- Chat em tempo real com WebSocket (instant messaging).
- Integração com redes sociais para login além do Google.
- Integrações pagas com serviços externos.
- Machine Learning avançado ou IA generativa para moderação automática.
- Suporte multi-idioma para interface.


## 4. Dicionário da EAP - Etapa 02

| Código | Termo Técnico              | Descrição                                                                                        |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------ |
| 2.1    | Requisitos (Etapa 02)      | Análise e especificação dos requisitos para as novas funcionalidades e melhorias da etapa.       |
| 2.2    | Integração Contínua (CI)   | Configuração de pipeline automática com GitHub Actions para build, testes e validação de código. |
| 2.3    | Containerização Kubernetes | Implementação de manifests Kubernetes para orquestração de containers em produção.               |
| 2.4    | Testes Automatizados       | Desenvolvimento e execução de testes unitários, integração, funcionais e performance.            |
| 2.5    | Testes de Usabilidade      | Execução de testes com usuários reais e análise heurística da interface.                         |
| 2.6    | Documentação e Relatórios  | Planos de custos, matriz de riscos e planejamento com testes funcionais, não funcionais e de API.             |