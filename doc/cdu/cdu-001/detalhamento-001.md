# CDU001. Nome... 

- **Ator principal**: Estudante
- **Atores secundários**: ...	 
- **Resumo**: O usuário pode fazer a criação, visualização, edição e deleção de um repositório pessoal, no qual a visualização de repositórios de outros usuários também é possível.
- **Pré-condição**: O usuário deve ter uma conta e um perfil autenticado
- **Pós-Condição**: Feedback de sucesso ou erro após cada ação

## Fluxo Principal - [Criar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| Usuário se direciona ao seu perfil pessoal | Aparece a tela do seu perfil |  
| Ele clica no botão novo  | Sistema mostra um pop-up na tela que dá a possibilidade do usuário escolher o que ele quer adicionar |  
| Ele escolhe a opção de novo repositório | É retornado uma tela que possui informações necessária na criação de um repositório  | 
| Usuário preenche as informações e anexa materiais e faz o envio | O repositório aparecerá no perfil da pessoa, além de aparecer na aba repositórios na página principal de comunidades  | 

## Fluxo Principal - [Visualizar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| Usuário se direciona ao seu perfil pessoal e clica na área “repositórios” | Sistema retorna todos os repositórios criado por ele |  
| Ao clicar no botão abrir ele consegue ver detalhadamente o conteúdo daquele repositório | É retornada uma tela que contém além de informações do repositório também contém os arquivos anexados a ele  |  

## Fluxo Principal - [Edição repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| Usuário clica no ícone de três pontos (°°°) | Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório  |  
| Ele opta por editar | Sistema retorna tela de edição |  
| Ele faz as alterações que julgar necessárias e salva | Redireciona o usuário ao repositório novamente com as alterações feitas |  

## Fluxo Principal - [Deleção repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| Usuário clica no ícone de três pontos (°°°) | Um pop-up que dá a possibilidade de optar entre editar ou deletar repositório |  
| Ele opta por deletar | Sistema retorna um pop-up de deleção |  
| Usuário confirma que deseja deletar | Deleta e retorna um feedback |  

## Fluxo Alternativo I - [Visualizar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| Ao entrar na aplicação é possível visualizar os repositórios de outros usuários e ao clicar no botão abrir ele consegue ver detalhadamente o conteúdo daquele repositório |  É retornada uma tela que contém além de informações do repositório também contém os arquivos anexados a ele |  

## Fluxo excessão - [Criar repositório]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| Usuário se direciona ao seu perfil pessoal | Aparece a tela do seu perfil |  
| Ele clica no botão novo | Sistema mostra um pop-up na tela que dá a possibilidade do usuário escolher o que ele quer adicionar | 
| Ele escolhe a opção de novo repositório | É retornado uma tela que possui informações necessária na criação de um repositório | 
| Usuário não preenche todas as informações/anexações obrigatórias |  Retorna uma mensagem de requisição de preenchimento de campos | 

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...