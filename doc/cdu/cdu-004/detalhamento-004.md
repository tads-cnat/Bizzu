# CDU004. Fazer Login

- **Ator principal**: Visitante
- **Atores secundários**: ...
- **Resumo**: Permite que um usuário com conta cadastrada no sistema se autentique utilizando e-mail ou nome de usuário e senha. Uma vez autenticado, o usuário tem acesso a funcionalidades exclusivas do sistema.  
- **Pré-condição**: O usuário não pode estar logado.
- **Pós-Condição**: Feedback de sucesso ou erro após a tentativa de login. Se bem-sucedido, o usuário é autenticado e ganha acesso a funcionalidades restritas.

## Fluxo Principal - [Fazer Login]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - Acessa a tela de login. | |
|  | 2 - Mostra o pop-up do login |
| 3 - Insere credenciais (e-mail ou nome de usuário e senha) e clica no botão "Entrar". |  |
| | 4 - Valida as credenciais, autentica o usuário e redireciona ao feed principal.|
## Fluxo Alternativo - [Esquecer Senha]
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: |
| 1 - Clica no botão "Esqueci minha senha". | |
| | 2 - Redireciona para uma tela de recuperação de senha. |
| 3 - Insere e-mail para recuperação. | |
| | 4 - Envia um e-mail com instruções para redefinição de senha. |

## Fluxo de Exceção - [Credenciais Inválidas]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - Insere credenciais incorretas e clica no botão "Entrar". | |
| | 2 - Valida as credenciais e identifica que são inválidas. |
| 3 - Pode tentar novamente ou acessar o fluxo de esquecer senha. |

## Protótipo
![LOGIN - DESLOGADO (COM ALTERAÇÕES](https://github.com/user-attachments/assets/ea5b850b-5db2-4742-a440-4b5ee7ec6c1d)


> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

### Fazer Login
![unnamed](https://github.com/user-attachments/assets/d23f8f5b-d50a-4680-819e-03b02992ae8c)

**Implementado por: Mateus Vitor Cavalcanti Rodrigues**

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
