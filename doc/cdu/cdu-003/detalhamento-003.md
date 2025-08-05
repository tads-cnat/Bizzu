# CDU003. Pesquisar Usuário

- **Ator principal**: Visitante, Internauta e Moderador
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode pesquisar perfis de outros usuários da rede social utilizando o nome de usuário (username) inserido no campo de busca.
- **Pré-condição**: Não há.
- **Pós-Condição**: O sistema exibe o perfil correspondente ao nome de usuário pesquisado ou uma mensagem de erro caso nenhum usuário seja encontrado.


## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 -  O usuário acessa o campo de pesquisa(search bar) na interface e preenche com o nome de usuário que deseja pesquisar. ||  
|| 2 - O sistema processa a solicitação e exibe o perfil correspondente ao nome de usuário pesquisado, caso exista.| 

## Fluxo Alternativo I - Não há

## Fluxo de Exceção I - [Nome de usuário não encontrado]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface e preenche com o nome de usuário desejado.|| 
|| 2 - O sistema processa a solicitação, mas não encontra nenhum perfil correspondente. Então, exibe a mensagem: “Sem resultados para sua pesquisa”|  

## Protótipo
![image](https://github.com/user-attachments/assets/d561949b-ee17-4e3d-9e3c-17769f074d0c)

![image](https://github.com/user-attachments/assets/5db1fa1b-6ae1-4c97-9631-2d3bacf54e28)


## Diagrama de Interação (Sequência ou Comunicação)

![5044434635727154993](https://github.com/user-attachments/assets/142fbeb3-4228-4687-82f9-f2d1fb1fc422)

## Diagrama de Classes de Projeto

![diagramaProjeto](https://github.com/user-attachments/assets/e3241dd7-9735-49d6-9b10-e0274e441056)


