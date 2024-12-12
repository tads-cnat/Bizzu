# CDU003. Pesquisar Conteúdo

- **Ator principal**: Usuário registrado na rede social
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode pesquisar conteúdos disponíveis na rede social, por meio de categorias ou palavras-chaves inseridas no campo de busca.  
- **Pré-condição**: Não há.
- **Pós-Condição**: Exibição do resultado da pesquisa ou mensagem de erro (feedback) caso não exista conteúdo correspondente


## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface| 3 - O sistema processa a solicitação de pesquisa e busca na base de dados|  
| 2 - O usuário preenche esse campo com uma palavra-chave, categoria ou nome de usuário que deseja achar e confirma a pesquisa | 4 - O sistema exibe os resultados, mostrando os conteúdos cadastrados no sistema, filtrados a partir da palavra-chave | 

## Fluxo Alternativo I - Não há

## Fluxo de Excessão I - [Não existe conteúdo com a palavra-chave pesquisada]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário acessa o campo de pesquisa na interface| 3 - O sistema processa a solicitação de pesquisa e busca na base de dados| 
| 2 - O usuário preenche esse campo com uma palavra-chave, categoria ou nome de usuário que deseja achar e confirma a pesquisa | 4 - Nenhum resultado correspondente é encontrado, então o sistema exibe a mensagem: “Sem resultados para sua pesquisa”|  
| 5 - O usuário refaz a busca modificando a palavra-chave colocada anteriormente | 6 - O sistema reinicia o processo de pesquisa |

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...