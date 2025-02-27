# CDU003. Pesquisar Conteúdo

- **Ator principal**: Estudante e visitante
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode pesquisar conteúdos disponíveis na rede social, por meio de categorias ou palavras-chaves inseridas no campo de busca.  
- **Pré-condição**: O estudante deve possuir um perfil previamente logado.
- **Pós-Condição**: Exibição do resultado da pesquisa ou mensagem de erro (feedback) caso não exista conteúdo correspondente


## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface e o preenche com uma palavra-chave, categoria ou nome de usuário que deseja achar e confirma a pesquisa ||  
|| 2 - O sistema processa a solicitação de pesquisa e exibe os resultados, mostrando os conteúdos cadastrados no sistema, filtrados a partir da palavra-chave | 

## Fluxo Alternativo I - Não há

## Fluxo de Exceção I - [Não existe conteúdo com a palavra-chave pesquisada]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface e o preenche com uma palavra-chave, categoria ou nome de usuário que deseja achar e confirma a pesquisa|| 
|| 2 - O sistema processa a solicitação de pesquisa e se nenhum resultado correspondente é encontrado, então o sistema exibe a mensagem: “Sem resultados para sua pesquisa”|  
| 3 - O usuário refaz a busca modificando a palavra-chave colocada anteriormente |

## Protótipo
![FEED PRINCIPAL - LOGADO (COM ALTERAÇÕES) (1)](https://github.com/user-attachments/assets/21e1fcc0-0dce-420a-8568-17e03ac54398)

![COMUNIDADES - POSTS (1)](https://github.com/user-attachments/assets/802e282c-45cc-48c2-8368-bca2795b2fcf)

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

![5044434635727154993](https://github.com/user-attachments/assets/142fbeb3-4228-4687-82f9-f2d1fb1fc422)

## Diagrama de Classes de Projeto

![diagramaProjeto](https://github.com/user-attachments/assets/e3241dd7-9735-49d6-9b10-e0274e441056)


