# CDU004. Fazer Login

- **Ator principal**: Usuário do sistema  
- **Atores secundários**: Sistema de autenticação  
- **Resumo**: Permite que um usuário com conta cadastrada no sistema se autentique utilizando e-mail ou nome de usuário e senha. Uma vez autenticado, o usuário tem acesso a funcionalidades exclusivas do sistema.  
- **Pré-condição**: O usuário não pode estar logado. O usuário deve possuir uma conta previamente registrada no sistema com e-mail ou nome de usuário e senha válidos.  
- **Pós-Condição**: Feedback de sucesso ou erro após a tentativa de login. Se bem-sucedido, o usuário é autenticado e ganha acesso a funcionalidades restritas.

## Fluxo Principal - [Fazer Login]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| Acessa a tela de login. | |
| Insere credenciais (e-mail ou nome de usuário e senha) e clica no botão "Entrar". | Valida as credenciais. |
| | Se forem válidas, autentica o usuário e redireciona ao feed principal. |
| | Exibe funcionalidades restritas ao usuário autenticado. |

## Fluxo Alternativo - [Esquecer Senha]
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: |
| Clica no botão "Esqueci minha senha". | |
| | Redireciona para uma tela de recuperação de senha. |
| Insere e-mail para recuperação. | |
| | Envia um e-mail com instruções para redefinição de senha. |
| Redefine a senha e retorna à tela de login. | |

## Fluxo de Exceção - [Credenciais Inválidas]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| Insere credenciais incorretas e clica no botão "Entrar". | |
| | Valida as credenciais e identifica que são inválidas. |
| | Exibe mensagem de erro: *"Credenciais inválidas. Verifique e tente novamente."* |
| Pode tentar novamente ou acessar o fluxo de recuperação de senha. |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
