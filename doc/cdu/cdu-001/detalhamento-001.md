# CDU001. CRUD repositório 

- **Ator principal**: Internauta e moderador 
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode fazer a criação, visualização, edição e deleção de um repositório pessoal, no qual a visualização de repositórios de outros usuários também é possível.
- **Pré-condição**: O usuário deve ter uma conta e um perfil autenticado
- **Pós-Condição**: Feedback de sucesso ou erro após cada ação

## Fluxo Principal - [Criar Repositório]

| **Ações do ator**                                                          | **Ações do sistema**                        |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| <a href="https://github.com/user-attachments/assets/f9c67ec9-ad2b-4768-a3b9-8debdf548aef"> 1. Usuário clica no botão “Novo” e seleciona opção "criar repositório" em seu perfil pessoal.</a>                                         |                                             |
|                                                                            | 2. Sistema exibe formulário de criação de repositório. |
| <a href="https://github.com/user-attachments/assets/b16c0415-2745-4ba0-a539-163558b81f0c"> 3. Preenche informações obrigatórias e clica em “Enviar”. </a> |                                             |
|                                                                            | 4. Mostra mensagem de sucesso.              |
| 5. Exibe perfil do usuário com o novo repositório sendo exibido               |                                             |

## Fluxo Alternativo - [Visualizar Repositório Perfil Pessoal]


| **Ações do ator**                | **Ações do sistema**                    |
| -------------------------------- | --------------------------------------- |
| <a href="https://github.com/user-attachments/assets/856b4a2d-eeaa-436c-95be-79bd23fd8c6b"> 1. Acessa a área de "Repositórios" no perfil pessoal. </a> |                                         |
|                                  | 2. Exibe lista de postagens do usuário. |
| 3. Ao clicar no botão abrir ele consegue ver detalhadamente o conteúdo daquele repositório |  |  
| | 4. É retornada uma tela que contém além de informações do repositório também contém os arquivos anexados a ele  |  

## Fluxo Alternativo - [Visualizar Repositório Feed]

| **Ações do ator**                | **Ações do sistema**                    |
| -------------------------------- | --------------------------------------- |
| 1. Abre página de feed(página inicial). |                       |
|                                  | 2. Exibe lista de repositórios mais recentes dos usuários e comunidades que aquele perfil segue. |
| 3. Ao clicar no botão "abrir" ele consegue ver detalhadamente o conteúdo daquele repositório |  |  
| | 4. É retornada uma tela que contém além de informações do repositório também contém os arquivos anexados a ele  |  

## Fluxo Alternativo - [Edição repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.  Usuário clica no ícone de três pontos (°°°) |  |  
| | <a href="https://github.com/user-attachments/assets/f3e5159b-5a8a-4790-9c97-001a96e3a3c8"> 2. Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório  </a>|  
| 3. Ele opta por editar | |  
| | <a href="https://github.com/user-attachments/assets/628544ba-93aa-4585-9415-2c9375933c3f"> 4. Exibe formulário de edição com campos preenchidos. </a>|  
| 5. Realiza alterações e salva.  | |  
|                                                                     | 6. Exibe uma mensagem de sucesso.                              |
| 7. Atualiza a postagem e redireciona para o perfil pessoal.         |                                                                | 

## Fluxo Alternativo - [Deleção repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.  Usuário clica no ícone de três pontos (°°°) | | 
|  |<a href="https://github.com/user-attachments/assets/f3e5159b-5a8a-4790-9c97-001a96e3a3c8"> 2. Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório </a> |  
| 3.  Ele opta por deletar | |  
|  | 4. Sistema retorna um pop-up de deleção |  
| 5. Usuário confirma que deseja deletar | |  
| | 6. Deleta e retorna um feedback | 

## Fluxo Excessão - [Criar Repositório]

| **Ações do ator**                                                          | **Ações do sistema**                        |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| <a href="https://github.com/user-attachments/assets/f9c67ec9-ad2b-4768-a3b9-8debdf548aef"> 1. Usuário clica no botão “Novo” e seleciona opção "criar repositório" em seu perfil pessoal.</a>                                         |                                             |
|                                                                            | 2. Sistema exibe formulário de criação de repositório. |
| 3. Não preenche todas as informações/anexações obrigatórias e clica em “Enviar”. </a> |                                             |
|                                                                            | 4. Mostra mensagem de requisição de preenchimento de campos obrigatórios             |

## Fluxo excecão - [Edição repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. Usuário clica no ícone de três pontos (°°°) | | 
| | <a href="https://github.com/user-attachments/assets/f3e5159b-5a8a-4790-9c97-001a96e3a3c8">  2. Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório </a> | 
|3. Ele opta por editar | | 
| | 4. Sistema retorna tela de edição | 
| 5. Ele faz as alterações que julgar necessárias mas não salva | | 
| | 6. Se o usuário tentar sair da tela sem confirmar alterações aparece um aviso | 

## Protótipos
![FEED PRINCIPAL EXPANDIDO REPOSITÓRIO](https://github.com/user-attachments/assets/f3e5159b-5a8a-4790-9c97-001a96e3a3c8)
![PERFIL (visao do proprio perfil) (3)](https://github.com/user-attachments/assets/f9c67ec9-ad2b-4768-a3b9-8debdf548aef)
![PERFIL (visao do proprio perfil) (2)](https://github.com/user-attachments/assets/ee9f065c-81f2-4ea5-b13b-90111bce35ba)
![CRIAR REPOSITÓRIO](https://github.com/user-attachments/assets/b16c0415-2745-4ba0-a539-163558b81f0c)
![EDITAR REPOSITORIO](https://github.com/user-attachments/assets/628544ba-93aa-4585-9415-2c9375933c3f)
![EXCLUIR REPOSITÓRIO](https://github.com/user-attachments/assets/5cad00a5-4938-43e7-b631-c14d4f3bef3e)
![INTERNO REPOSITÓRIO](https://github.com/user-attachments/assets/f97dee7e-bbe2-4642-89bc-0e3dfa31bba7)
![PERFIL (visao do proprio perfil) (4)](https://github.com/user-attachments/assets/856b4a2d-eeaa-436c-95be-79bd23fd8c6b)

## Diagrama de Interação (Sequência ou Comunicação)
![Criar repositório diagrma de sequncia^](https://github.com/user-attachments/assets/3f4a4f01-ee4d-40c5-ab5e-7fa535bf0ddd)


## Diagrama de Classes de Projeto

![Repositrio classes relacionadas ](https://github.com/user-attachments/assets/48e20348-7a01-41c5-a53c-07893dc36b4e)


