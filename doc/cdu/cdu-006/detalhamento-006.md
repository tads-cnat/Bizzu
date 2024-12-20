# CDU006. Fazer cadastro

- **Ator principal**: Estudante
- **Atores secundários**: ...	 
- **Resumo**: O caso de uso permite que o usuário possa fazer o cadastro no sistema, fornecendo dados como: nome de usuário, email, senha e escolhendo quais comunidades são de seu interesse, o sistema valida os dados e armazena as informações no banco de dados.
- **Pré-condição**: O usuário não pode estar autenticado no sistema.
- **Pós-Condição**: O Cadastro estará concluído com sucesso e o usuário estará habilitado para acessar o conteúdo das comunidades selecionadas na etapa de cadastro.

## Fluxo Basico - [ Fazer cadastro ]
| Ações do ator (usuario) | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. O usuário acessa o pop up de fazer login e Clica no botão de fazer cadastro |  |  
| | 2. O sistema exibe o formulário de cadastro solicitando: nome de usuário, email, senha e seleção de comunidades. |  
| 3. O usuário preenche os campos solicitados e confirma o cadastro. | | 
|| 4. O sistema valida os dados fornecidos, e os dados são armazenados no banco de dados e o sistema exibe uma mensagem confirmando o sucesso do cadastro..  | 


## Fluxo Alternativo I - [ E-mail já cadastrado ]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
|  | 1. Após o passo 4 do fluxo básico, o sistema detecta que o e-mail já está registrado e exibe uma mensagem informando que o e-mail já está cadastrado, sugerindo fazer login ou usar outro e-mail.|  
| 2. O usuário fornece um novo e-mail válido. | |  
| | 3. O sistema valida os novos dados e retorna ao passo 4 do fluxo básico. | 


## Fluxo de exceção - [ Senha inválida ]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| | 1. Durante o passo 3 do fluxo básico, o sistema detecta que a senha não atende aos critérios mínimos, e exibe uma mensagem indicando os requisitos de senha. |
| 2. O usuario digita uma nova senha | |  
| | 3. O sistema retorna ao fluxo básico no passo 4 |

**Protótipos**
![Feed principal - Pop-up de login](<LOGIN - DESLOGADO (COM ALTERAÇÕES.png>)

![Tela de cadastro](<TELA DE CADASTRO.png>)



> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
