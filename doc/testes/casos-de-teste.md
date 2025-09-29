# Testes Funcionais - Gerenciar Denúncias

### CDU 012 - Gerenciar denúncias

#### Fluxo Principal - Criar denúncia

| Entrada 01 | Entrada 02 | Entrada 03 | Entrada 04 | Resultado esperado | Resultado obtido | Situação |
|------------|------------|------------|------------|-------------------|------------------|----------|
| Postagem (ID: 15) | Spam | "Esta postagem contém propaganda excessiva" | Usuário autenticado | Denúncia criada com sucesso! | - | - |
| Comentário (ID: 8) | Conteúdo ofensivo | "" | Usuário autenticado | Denúncia criada com sucesso! | - | - |
| Repositório (ID: 3) | Conteúdo inadequado | "Arquivo não condiz com a descrição" | Usuário autenticado | Denúncia criada com sucesso! | - | - |
| Postagem (ID: 999) | Spam | "Conteúdo suspeito" | Usuário autenticado | Error: Conteúdo não encontrado no sistema. | - | - |
| Postagem (ID: 15) | (vazio) | "Postagem inadequada" | Usuário autenticado | Error: Você deve selecionar pelo menos um motivo. | - | - |
| Postagem (ID: 15) | Spam | "Conteúdo suspeito" | Usuário não autenticado | Error: Você precisa estar logado para fazer uma denúncia. | - | - |

#### Fluxo Alternativo - Visualizar denúncias (Admin)

| Entrada 01 | Entrada 02 | Entrada 03 | Resultado esperado | Resultado obtido | Situação |
|------------|------------|------------|-------------------|------------------|----------|
| Admin logado | Status: Pendente | Todos os tipos | Lista todas as denúncias pendentes ordenadas por data. | - | - |
| Admin logado | Status: Aprovada | Tipo: Postagens | Lista apenas denúncias aprovadas de postagens. | - | - |
| Usuário comum | Status: Pendente | Todos os tipos | Error: Acesso negado. Apenas administradores podem gerenciar denúncias. | - | - |
| Admin logado | Nenhuma denúncia no sistema | - | Exibe mensagem: "Nenhuma denúncia encontrada." | - | - |

#### Fluxo Alternativo - Aprovar/Rejeitar denúncia

| Entrada 01 | Entrada 02 | Entrada 03 | Entrada 04 | Resultado esperado | Resultado obtido | Situação |
|------------|------------|------------|------------|-------------------|------------------|----------|
| Denúncia (ID: 5) | Aprovar | "Conteúdo realmente inadequado para a plataforma" | Admin | Denúncia aprovada! Conteúdo removido do sistema. | - | - |
| Denúncia (ID: 7) | Rejeitar | "Denúncia sem fundamento, conteúdo está adequado" | Admin | Denúncia rejeitada! Conteúdo mantido no sistema. | - | - |
| Denúncia (ID: 999) | Aprovar | "Conteúdo inadequado" | Admin | Error: Denúncia não encontrada no sistema. | - | - |
| Denúncia (ID: 5) | Aprovar | (vazio) | Admin | Error: Justificativa é obrigatória. | - | - |
| Denúncia (ID: 5) | Aprovar | "Conteúdo inadequado" | Usuário comum | Error: Acesso negado. Apenas administradores podem gerenciar denúncias. | - | - |

#### Fluxo Alternativo - Excluir denúncia

| Entrada 01 | Entrada 02 | Resultado esperado | Resultado obtido | Situação |
|------------|------------|-------------------|------------------|----------|
| Denúncia (ID: 12) | Admin | Denúncia excluída com sucesso! | - | - |
| Denúncia (ID: 999) | Admin | Error: Denúncia não encontrada no sistema. | - | - |
| Denúncia (ID: 12) | Usuário comum | Error: Acesso negado. Apenas administradores podem excluir denúncias. | - | - |
