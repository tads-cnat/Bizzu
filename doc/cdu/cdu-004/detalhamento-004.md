# CDU004. Fazer Login

- **Ator principal**: Usuário do sistema  
- **Atores secundários**: Sistema de autenticação  
- **Resumo**: Permite que um usuário com conta cadastrada se autentique no sistema usando e-mail ou nome de usuário e senha. Após o login, ele terá acesso às funcionalidades restritas.  
- **Pré-condição**: O usuário não pode estar logado e deve possuir uma conta previamente registrada com credenciais válidas.  
- **Pós-Condição**: Feedback de sucesso ou erro após a tentativa de login. Caso seja bem-sucedido, o usuário é autenticado e obtém acesso às funcionalidades restritas.

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - Acessa a tela de login. | |
| 2 - Insere credenciais (e-mail ou nome de usuário e senha) e clica no botão "Entrar". | 3 - Valida as credenciais. |
| | 4 - Se válidas, autentica o usuário e redireciona ao feed principal. |
| | 5 - Exibe funcionalidades restritas ao usuário autenticado. |

## Fluxo Alternativo I - Esquecer Senha
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: |
| 1.1 - Clica no botão "Esqueci minha senha". | |
| | 1.2 - Redireciona para uma tela de recuperação de senha. |
| 1.3 - Insere e-mail para recuperação. | |
| | 1.4 - Envia um e-mail com instruções para redefinição de senha. |
| 1.5 - Redefine a senha e retorna à tela de login. | |

## Fluxo Alternativo II - Credenciais Inválidas
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 2.1 - Insere credenciais incorretas e clica no botão "Entrar". | |
| | 2.2 - Valida as credenciais e identifica que são inválidas. |
| | 2.3 - Exibe mensagem de erro: *"Credenciais inválidas. Verifique e tente novamente."* |
| 2.4 - Pode tentar novamente ou acessar o fluxo de recuperação de senha. | |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...

