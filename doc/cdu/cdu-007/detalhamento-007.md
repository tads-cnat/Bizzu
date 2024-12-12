# CDU007. Comentar postagem

- **Ator principal**: Usuário registrado e logado.
- **Atores secundários**: ...	 
- **Resumo**: O usuário, devidamente cadastrado e logado, pode comentar em uma postagem ao clicar no ícone de “balãozinho” associado à postagem. Ele pode responder a postagens com texto, imagens, ou ambos.
- **Pré-condição**: 
1. O usuário deve possuir um cadastro ativo na plataforma.
2.  O usuário deve estar logado na sua conta.

- **Pós-Condição**: 
1. O comentário será registrado no post correspondente, associado ao usuário que o realizou.
2. Feedback positivo ou negativo será fornecido ao usuário em caso de sucesso ou erro.

## Fluxo Principal [Comentar em uma postagem]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. O usuário clica no ícone de “balãozinho” de comentar em uma postagem específica. | ... | 
| ... | 2. O sistema exibe o pop-up de comentar daquela postagem. |
| 3. O usuário digita sua mensagem no campo de texto fornecido e confirma o envio do comentário clicando no botão “Comentar”. | ... |
| ... | 4. O sistema salva o comentário no banco de dados, associando-o ao post e ao usuário e atualiza a lista de comentários exibida, incluindo o novo comentário.|



## Fluxo Alternativo  [Cancelar comentário] 
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| ... | 1. O sistema exibe a tela de comentários da postagem. |  
| 2. O usuário digita uma mensagem, mas opta por fechar a tela sem clicar no botão “Comentar” |  ... |
| ... | 3. O sistema descarta o comentário digitado sem salvá-lo e retorna o usuário retorna à tela anterior. |

## Fluxo alternativo [Comentar em postagens contendo diferentes formatos de mídia]
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| ... | 1. O sistema exibe uma postagem com texto, imagens ou ambos. |  
| 2. O usuário clica no ícone de “balãozinho” de realizar comentário. | ... |
| ... | 3. O sistema exibe a tela de comentários, incluindo o conteúdo completo da postagem para contexto. |  
| 4. O usuário digita o comentário e confirma clicando no botão “Comentar”. | ... |
| ... | 5. O sistema salva e exibe o comentário associado à postagem. |  


## Fluxo de exceção [Erro ao salvar comentário]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| ... | 1. O sistema exibe a tela de comentários da postagem. |  
| 2. O usuário digita sua mensagem e clica no botão “Comentar”. | ... |  
| ... | 3. O sistema tenta salvar o comentário, mas ocorre uma falha (ex.: problemas de conexão ou erro no servidor). | 
| ... | 4. O sistema exibe uma mensagem de erro ao usuário informando que o comentário não pôde ser salvo. | 
| ... | 5. O sistema permite ao usuário tentar novamente ou descartar a tentativa. | 

## Protótipo
![Captura de tela 2024-12-10 214804](https://github.com/user-attachments/assets/aabaf6e6-6f5d-4f62-a2c4-7ff79c2100a7)

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
