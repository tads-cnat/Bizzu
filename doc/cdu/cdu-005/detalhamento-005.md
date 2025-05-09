# CDU005. Gerenciar Postagem

- **Ator principal**: Internauta e moderador
- **Atores secundários**: ...
- **Resumo**: Permite ao usuário criar, visualizar, editar e deletar postagens pessoais, bem como visualizar postagens de outros usuários na comunidade.
- **Pré-condição**: O usuário deve ter uma conta e estar autenticado no sistema.
- **Pós-condição**: Feedback de sucesso ou erro após cada ação executada.

## Fluxo Principal - [Criar Postagem]

| **Ações do ator**                                                          | **Ações do sistema**                        |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| 1. Acessa a área de perfil pessoal.                                        |                                             |
|                                                                            | 2. Exibe a tela de perfil do usuário.       |
| 3. Clica no botão “Nova Postagem”.                                         |                                             |
|                                                                            | 4. Exibe formulário de criação de postagem. |
| <a href=""> 5. Preenche informações obrigatórias e clica em “Enviar”. </a> |                                             |
|                                                                            | 6. Mostra mensagem de sucesso.              |
| 7. Exibe perfil do usuário com a nova postagem sendo exibida               |                                             |

## Fluxo Alternativo - [Visualizar Postagem] <div id="visualizar">

| **Ações do ator**                | **Ações do sistema**                    |
| -------------------------------- | --------------------------------------- |
| 1. Acessa a área de "Postagens". |                                         |
|                                  | 2. Exibe lista de postagens do usuário. |

## Fluxo Alternativo - [Editar Postagem]

| **Ações do ator**                                                   | **Ações do sistema**                                           |
| ------------------------------------------------------------------- | -------------------------------------------------------------- |
| <a id="visualizar" > 1. Visualiza postagem feita por ele mesmo </a> |                                                                |
|                                                                     | 2. Exibe opções ao clicar nos três pontos ao lado da postagem. |
| 3. Seleciona “Editar postagem”.                                     |                                                                |
|                                                                     | <a> 4. Exibe formulário de edição com campos preenchidos. </a> |
| 5. Realiza alterações e salva.                                      |                                                                |
|                                                                     | 6. Exibe uma mensagem de sucesso.                              |
| 7. Atualiza a postagem e redireciona para o perfil pessoal.         |                                                                |

## Fluxo Alternativo - [Deletar Postagem]

| **Ações do ator**                                                          | **Ações do sistema**                                           |
| -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| <a id="visualizar"> 1. Visualiza postagem própria que deseja deletar. </a> |                                                                |
|                                                                            | 2. Exibe opções ao clicar nos três pontos ao lado da postagem. |
| 3. Seleciona “Deletar”.                                                    |                                                                |
|                                                                            | 4. Exibe pop-up de confirmação de deleção.                     |
| 5. Confirma a ação.                                                        |                                                                |
|                                                                            | 6. Exibe mensagem de sucesso                                   |
| 7. Remove a postagem e redireciona para o perfil pessoal.                  |                                                                |

## Fluxo Alternativo - [Visualizar Postagem de Outros Usuários]

| **Ações do ator**                | **Ações do sistema**                                            |
| -------------------------------- | --------------------------------------------------------------- |
| 1. Navega pela página principal. |                                                                 |
|                                  | 2. Clica no nome do usuário para acessar o seu perfil.          |
| 3. Clica na área de postagens.   |                                                                 |
|                                  | 4. Exibe postagens de outro usuário organizadas por cronologia. |

## Fluxo de Exceção - [Criar/Editar Postagem]

| **Ações do ator**                                             | **Ações do sistema**                                                         |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1. Tenta enviar formulário sem preencher campos obrigatórios. |                                                                              |
|                                                               | 2. Exibe mensagem de erro solicitando preenchimento dos campos obrigatórios. |

## Fluxo de Exceção - [Editar Postagem]

| **Ações do ator**                              | **Ações do sistema**                                           |
| ---------------------------------------------- | -------------------------------------------------------------- |
| 1. Realiza alterações e tenta sair sem salvar. |                                                                |
|                                                | 2. Exibe aviso de confirmação para sair sem salvar alterações. |

## Protótipo

![image](CRIAR%20POSTAGEM.png)
![image](<EDITAR%20POSTAGEM%20(1).png>)
![image](EXCLUIR%20POSTAGEM.png)
![image](FEED%20PRINCIPAL%20EXPANDIDO%20POSTAGEM.png)
![image](<PERFIL%20(visao%20do%20proprio%20perfil)%20(1).png>)
![image](<PERFIL%20(visao%20do%20proprio%20perfil).png>)

## Diagrama de Interação (Sequência ou Comunicação)

> ![image](https://github.com/user-attachments/assets/01992257-7487-4ce1-ba78-25580395ce8a)
> ()

## Diagrama de Classes de Projeto

> ![image](https://github.com/user-attachments/assets/b22f1827-850d-416a-b753-f92183cc4464)
