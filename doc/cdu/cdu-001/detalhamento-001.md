# CDU001. CRUD repositório 

- **Ator principal**: Estudante
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
|| 6. É retornado uma tela que possui informações necessária na criação de um repositório  | 
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
| | 2. Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório  |  
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
![FEED PRINCIPAL - REPOSITÓRIO](https://github.com/user-attachments/assets/f038863b-83c1-4d5d-af49-854311529f68)

![PERFIL NA MINHA VISÂO - REPOSITÓRIO COMUNIDADE EXPANDIDA](https://github.com/user-attachments/assets/58d832c6-d659-4a50-ab38-7a955a493a7b)


> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...
