# CDU001. CRUD repositório 

- **Ator principal**: Internauta e moderador 
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode fazer a criação, visualização, edição e deleção de um repositório pessoal, no qual a visualização de repositórios de outros usuários também é possível.
- **Pré-condição**: O usuário deve ter uma conta e um perfil autenticado
- **Pós-Condição**: Feedback de sucesso ou erro após cada ação

## Fluxo Principal - [Criar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. Usuário se direciona ao seu perfil pessoal |  |  
|  | 2. Aparece a tela do seu perfil | 
| 3. Ele clica no botão novo  | |  
| | 4. Sistema mostra um pop-up na tela que dá a possibilidade do usuário escolher o que ele quer adicionar |  
| 5. Ele escolhe a opção de novo repositório | | 
|| 6. É retornado uma tela que possui informações necessária na criação de um repositório como comunidade, categorias que são opcionais, título, descrição e arquivos | 
| 7.  Usuário preenche as informações e anexa materiais e faz o envio |  | 
|  | 8.  O repositório aparecerá no perfil da pessoa, além de aparecer na aba repositórios na página principal de comunidades  | 

## Fluxo Principal - [Visualizar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. Usuário se direciona ao seu perfil pessoal e clica na área “repositórios” |  |  
|  | 2. Sistema retorna todos os repositórios criado por ele |  
| 3. Ao clicar no botão abrir ele consegue ver detalhadamente o conteúdo daquele repositório |  |  
| | 4. É retornada uma tela que contém além de informações do repositório também contém os arquivos anexados a ele  |  

## Fluxo Principal - [Edição repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.  Usuário clica no ícone de três pontos (°°°) |  |  
| | 2. Um pop-up que dá a possibilidade de optar entre criar, editar ou deletar repositório  |  
| 3. Ele opta por editar | |  
| | 4. Sistema retorna tela de edição |  
| 5. Ele faz as alterações que julgar necessárias e salva | |  
| | 6. Redireciona o usuário ao repositório novamente com as alterações feitas |  

## Fluxo Principal - [Deleção repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1.  Usuário clica no ícone de três pontos (°°°) | | 
|  | 2. Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório |  
| 3.  Ele opta por deletar | |  
|  | 4. Sistema retorna um pop-up de deleção |  
| 5. Usuário confirma que deseja deletar | |  
| | 6. Deleta e retorna um feedback | 

## Fluxo Alternativo - [Visualizar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1. Ao entrar na aplicação é possível visualizar os repositórios de outros usuários e ao clicar no botão abrir ele consegue ver detalhadamente o conteúdo daquele repositório | |  
| | 2. É retornada uma tela que contém além de informações do repositório também contém os arquivos anexados a ele |

## Fluxo exceção - [Criar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. Usuário se direciona ao seu perfil pessoal | |  
| | 2. Aparece a tela do seu perfil |  
| 3. Ele clica no botão novo | | 
| | 4. Sistema mostra um pop-up na tela que dá a possibilidade do usuário escolher o que ele quer adicionar | 
| 5. Ele escolhe a opção de novo repositório | | 
| | 6. É retornado uma tela que possui informações necessária na criação de um repositório | 
| 7. Usuário não preenche todas as informações/anexações obrigatórias | | 
| | 8. Retorna uma mensagem de requisição de preenchimento de campos | 

## Fluxo excecão - [Edição repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1. Usuário clica no ícone de três pontos (°°°) | | 
| | 2. Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório | 
|3. Ele opta por editar | | 
| | 4. Sistema retorna tela de edição | 
| 5. Ele faz as alterações que julgar necessárias mas não salva | | 
| | 6. Se o usuário tentar sair da tela sem confirmar alterações aparece um aviso | 

## Protótipos
![FEED PRINCIPAL - REPOSITÓRIO](FEED%20PRINCIPAL%20EXPANDIDO%20REPOSITÓRIO.png)

![PERFIL USUÁRIO](PERFIL%20(visao%20do%20proprio%20perfil).png)

![PERFIL NA MINHA VISÂO - NOVO REPOSITÓRIO](PERFIL%20(visao%20do%20proprio%20perfil)%20(1).png)

![CRIAR REPOSITÓRIO](CRIAR%20REPOSITÓRIO.png)

![EDITAR REPOSITÓRIO](EDITAR%20POSTAGEM.png)

![EXCLUIR REPOSITÓRIO](EXCLUIR%20REPOSITÓRIO.png)

![INTERNO REPOSITÓRIO](INTERNO%20REPOSITÓRIO.png)


## Diagrama de Interação (Sequência ou Comunicação)
![Criar repositório diagrma de sequncia^](https://github.com/user-attachments/assets/3f4a4f01-ee4d-40c5-ab5e-7fa535bf0ddd)


## Diagrama de Classes de Projeto

![Repositrio classes relacionadas ](https://github.com/user-attachments/assets/48e20348-7a01-41c5-a53c-07893dc36b4e)


