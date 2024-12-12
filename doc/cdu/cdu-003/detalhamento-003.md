# CDU003. Pesquisar Conteúdo

- **Ator principal**: Usuário registrado na rede social
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode pesquisar conteúdos disponíveis na rede social, por meio de categorias ou palavras-chaves inseridas no campo de busca.  
- **Pré-condição**: Não há.
- **Pós-Condição**: Exibição do resultado da pesquisa ou mensagem de erro (feedback) caso não exista conteúdo correspondente


## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface e o preenche com uma palavra-chave, categoria ou nome de usuário que deseja achar e confirma a pesquisa ||  
|| 2 - O sistema processa a solicitação de pesquisa e exibe os resultados, mostrando os conteúdos cadastrados no sistema, filtrados a partir da palavra-chave | 

## Fluxo Alternativo I - Não há

## Fluxo de Excessão I - [Não existe conteúdo com a palavra-chave pesquisada]
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

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
