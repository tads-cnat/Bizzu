# CDU007. Comentar postagem //alterar titulo?

- **Ator principal**: Internauta e moderador
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode adicionar um comentário ao clicar no ícone de "balão de fala" em uma postagem já existente na plataforma.
- **Pré-condição**: 
1.  O usuário deve estar autenticado no sistema.

- **Pós-Condição**: 
1. O comentário será registrado no post correspondente, associado ao usuário que o realizou.
2. Feedback positivo ou negativo será fornecido ao usuário em caso de sucesso ou erro.

## Fluxo Principal [Comentar em uma postagem]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. O usuário clica no ícone de “Balão de fala” para fazer um comentario na postagem. | ... | 
| ... | 2. O sistema exibe o pop-up para que o usuário realize o comentario. |
| 3. O usuário digita sua mensagem no campo de texto fornecido e confirma o envio do comentário clicando no botão “Comentar”. | ... |
| ... | 4. O sistema salva o comentário no banco de dados, associando-o ao post e ao usuário e atualiza a lista de comentários exibida, incluindo o novo comentário.|



## Fluxo Alternativo  [Cancelar comentário] //falta revisar
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| ... | 1. O sistema exibe a tela de comentários da postagem. |  
| 2. O usuário digita uma mensagem, mas opta por fechar a tela sem clicar no botão “Comentar” |  ... |
| ... | 3. O sistema descarta o comentário digitado sem salvá-lo e retorna o usuário retorna à tela anterior. |


## Fluxo de exceção [Erro ao salvar comentário] //falta revisar
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| ... | 1. O sistema exibe a tela de comentários da postagem. |  
| 2. O usuário digita sua mensagem e clica no botão “Comentar”. | ... |  
| ... | 3. O sistema tenta salvar o comentário, mas ocorre uma falha (ex.: problemas de conexão ou erro no servidor). | 
| ... | 4. O sistema exibe uma mensagem de erro ao usuário informando que o comentário não pôde ser salvo. | 
| ... | 5. O sistema permite ao usuário tentar novamente ou descartar a tentativa. | 

## Protótipo //Mudar fotos
![Captura de tela 2024-12-10 214804](https://github.com/user-attachments/assets/aabaf6e6-6f5d-4f62-a2c4-7ff79c2100a7)

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> ![Captura de tela 2025-02-26 212157](https://github.com/user-attachments/assets/15fba626-b9c6-45b4-b133-0dba3a547cc6)


## Diagrama de Classes de Projeto

> ![Captura de tela 2025-02-26 212247](https://github.com/user-attachments/assets/dcc68364-7f20-4d0f-a3f2-26b2a5b2398e)

