# CDU003. Pesquisar Conteúdo

- **Ator principal**: Visitante, Internauta e Moderador
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode pesquisar conteúdos disponíveis na rede social, por meio de palavras-chaves inseridas no campo de busca.  
- **Pré-condição**: Não há.
- **Pós-Condição**: Exibição do resultado da pesquisa ou mensagem de erro (feedback) caso não exista conteúdo correspondente.


## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface e o preenche com uma palavra-chave, nome de usuário ou postagem que deseja achar e confirma a pesquisa ||  
|| 2 - O sistema processa a solicitação de pesquisa e exibe os resultados, mostrando os conteúdos cadastrados no sistema, filtrados a partir da busca realizada.| 

## Fluxo Alternativo I - Não há

## Fluxo de Exceção I - [Quando não existe conteúdo com a palavra-chave pesquisada]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface e o preenche com uma palavra-chave, nome de usuário ou postagem que deseja achar e confirma a pesquisa|| 
|| 2 - O sistema processa a solicitação de pesquisa e nenhum resultado correspondente é encontrado, então o sistema exibe a mensagem: “Sem resultados para sua pesquisa”|  

## Protótipo
![image](https://github.com/user-attachments/assets/d561949b-ee17-4e3d-9e3c-17769f074d0c)

![image](https://github.com/user-attachments/assets/5db1fa1b-6ae1-4c97-9631-2d3bacf54e28)


## Diagrama de Interação (Sequência ou Comunicação)

![5044434635727154993](https://github.com/user-attachments/assets/142fbeb3-4228-4687-82f9-f2d1fb1fc422)

## Diagrama de Classes de Projeto

![diagramaProjeto](https://github.com/user-attachments/assets/e3241dd7-9735-49d6-9b10-e0274e441056)


