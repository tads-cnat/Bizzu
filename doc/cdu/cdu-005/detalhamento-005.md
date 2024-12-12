# CDU005. Gerenciar Postagem

- **Ator principal**: Usuário  
- **Atores secundários**: Sistema  
- **Resumo**: Permite ao usuário criar, visualizar, editar e deletar postagens pessoais, bem como visualizar postagens de outros usuários na comunidade.  
- **Pré-condição**: O usuário deve ter uma conta e estar autenticado no sistema.  
- **Pós-condição**: Feedback de sucesso ou erro após cada ação executada.  

## Fluxo Principal - [Criar Postagem]
| **Ações do ator**                   | **Ações do sistema**                             |
|-------------------------------------|-------------------------------------------------|
| 1. Acessa a área de perfil pessoal. | 2. Exibe a tela de perfil do usuário.           |
| 3. Clica no botão “Nova Postagem”.  | 4. Exibe formulário de criação de postagem.     |
| 5. Preenche informações obrigatórias e clica em “Enviar”. | 6. Adiciona a postagem ao perfil do usuário e exibe na comunidade. |

## Fluxo Principal - [Visualizar Postagem]
| **Ações do ator**                   | **Ações do sistema**                             |
|-------------------------------------|-------------------------------------------------|
| 1. Acessa a área de "Postagens".    | 2. Exibe lista de postagens do usuário.         |
| 3. Clica no botão “Abrir” em uma postagem. | 4. Exibe tela detalhada da postagem.           |

## Fluxo Principal - [Editar Postagem]
| **Ações do ator**                   | **Ações do sistema**                             |
|-------------------------------------|-------------------------------------------------|
| 1. Acessa a área de “Postagens”.    | 2. Exibe opções ao clicar nos três pontos ao lado da postagem. |
| 3. Seleciona “Editar”.              | 4. Exibe formulário de edição com campos preenchidos. |
| 5. Realiza alterações e salva.      | 6. Atualiza a postagem e redireciona para a tela correspondente. |

## Fluxo Principal - [Deletar Postagem]
| **Ações do ator**                   | **Ações do sistema**                             |
|-------------------------------------|-------------------------------------------------|
| 1. Acessa a área de “Postagens”.    | 2. Exibe opções ao clicar nos três pontos ao lado da postagem. |
| 3. Seleciona “Deletar”.             | 4. Exibe pop-up de confirmação de deleção.      |
| 5. Confirma a ação.                 | 6. Remove a postagem e exibe feedback.          |

## Fluxo Alternativo - [Visualizar Postagem de Outros Usuários]
| **Ações do ator**                   | **Ações do sistema**                             |
|-------------------------------------|-------------------------------------------------|
| 1. Navega pela página principal.    | 2. Exibe postagens de outros usuários organizadas por relevância ou cronologia. |
| 3. Clica no botão “Abrir” de uma postagem. | 4. Exibe tela detalhada da postagem com anexos e informações. |

## Fluxo de Exceção - [Criar Postagem]
| **Ações do ator**                   | **Ações do sistema**                             |
|-------------------------------------|-------------------------------------------------|
| 1. Tenta enviar formulário sem preencher campos obrigatórios. | 2. Exibe mensagem de erro solicitando preenchimento dos campos obrigatórios. |

## Fluxo de Exceção - [Editar Postagem]
| **Ações do ator**                   | **Ações do sistema**                             |
|-------------------------------------|-------------------------------------------------|
| 1. Realiza alterações e tenta sair sem salvar. | 2. Exibe aviso de confirmação para sair sem salvar alterações. |
## Protótipo
![image](https://github.com/user-attachments/assets/073489ca-d550-4368-9158-af792f3de1c4)
![image](https://github.com/user-attachments/assets/972535ad-2772-4a0c-8aa3-ceaa51f52582)



> **Obs.:** As seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)
> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto
> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
