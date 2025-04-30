# Especificações de Casos de Uso

![UseCase Diagram0](Diagrama%20de%20caso%20de%20uso%20do%20bizzu.png)

## 001 - CRUD repositório
**Pré-condições:** O usuário deve ter uma conta e um perfil autenticado.  
**Resumo:** Ao acessar seu perfil pessoal, o usuário pode criar um repositório ao interagir com o botão "novo" e selecionar a opção "criar novo repositório". Para efetivação, é necessário colocar os arquivos, um título e, opcionalmente, selecionar categorias. Alterações como edição de título, categorias e arquivos, além da exclusão do repositório, são possíveis. A exibição dos repositórios será feita no feed principal, no feed dos seguidores e na comunidade associada, além de estar visível no perfil pessoal do usuário.  
**Observação:** Os fluxos principais incluem visualização, criação, edição e exclusão. Fluxos de exceção devem considerar falhas na busca, exclusão ou atualização do repositório. 

---

## 002 - Manutenção perfil pessoal
**Pré-condições:** O usuário deve possuir um perfil previamente logado.  
**Resumo:** O usuário acessa a seção de perfil pessoal e pode editar dados como nome, foto de perfil e biografia, além de atualizar a seção de educação e gerenciar conteúdos salvos. O sistema valida as informações fornecidas e salva os dados atualizados.  
**Observação:** Campos obrigatórios ou inválidos devem gerar mensagens de erro. Problemas de conexão durante a atualização devem alertar o usuário sobre a falha.  

---

## 003 - Pesquisar conteúdo
**Pré-condições:** Não há.  
**Resumo:** O usuário acessa o campo de pesquisa na interface, e preenche o campo com uma palavra-chave, categoria ou nome de usuário. O sistema processa a solicitação de pesquisa e busca na base de dados, exibindo os resultados filtrados a partir dessa solicitação.  
**Observação:** Caso não exista um conteúdo com a palavra-chave pesquisada pelo usuário, aparecerá uma mensagem indicando que não existe conteúdo correspondente.  

---

## 004 - Fazer login
**Pré-condições:** O usuário não pode estar logado no sistema.  
**Resumo:** Caso o usuário possua uma conta cadastrada no sistema e não esteja logado, ele poderá realizar o login utilizando recursos como e-mail ou nome de usuário e senha. Para autenticar-se, basta clicar no botão "Entrar" do feed principal.  
**Observação:** Algumas funcionalidades do sistema estão disponíveis apenas para usuários autenticados.  

---

## 005 - CRUD postagens
**Pré-condições:** O usuário deve possuir uma conta e um perfil autenticado.  
**Resumo:** O usuário pode criar uma nova postagem no feed ou no perfil pessoal, interagindo com o botão "novo" e selecionando "nova postagem". É necessário incluir conteúdo principal (texto, imagem ou vídeo), escolher uma comunidade e uma categoria. É possível editar ou excluir as postagens. As postagens serão exibidas no feed principal, no feed dos seguidores e nas comunidades relacionadas, além do perfil pessoal.  
**Observação:** Os fluxos principais incluem visualização, criação, edição e exclusão. Fluxos de exceção devem considerar falhas na busca, exclusão ou atualização da postagem.  
---

## 006 - Fazer cadastro
**Pré-condições:** O usuário não deve estar autenticado.  
**Resumo:** Ao acessar o feed, o usuário pode criar uma conta ao clicar em "fazer cadastro" no pop-up de aviso ou no botão "entrar". É necessário fornecer nome de usuário, e-mail e senha. Após confirmar, o usuário é direcionado para escolher comunidades e criar o perfil.  
**Observação:** O sistema deve fornecer feedback de conclusão do cadastro, como um pop-up.  

---

##  007 - Comentar
**Pré-condições:** O usuário deve ter cadastro no site e também estar logado.  
**Resumo:** O usuário já devidamente cadastrado e logado, ao clicar no "balãozinho" do post, entra na tela de comentário, onde pode responder à postagem independentemente se a mesma é apenas texto, imagem ou os dois ao mesmo tempo.  
**Observação:** Caso o usuário feche a postagem sem ter confirmado a resposta, a mesma não deve ser registrada no post; ou seja, a mensagem será descartada.  

## 008 - Filtrar conteúdo
**Pré-condições:** Não há.  
**Resumo:** O usuário acessa o botão de filtragem e seleciona os critérios que deseja de acordo com as categorias pré-definidas. O sistema aplica essa filtragem e atualiza a página, mostrando apenas os resultados com as categorias escolhidas.  
**Observação:** Caso alguma categoria não seja encontrada, aparecerá uma mensagem indicando que não existe nenhum tipo de resultado.  

---

## 009 - Curtir postagem
**Pré-condições:** O usuário precisa estar logado e não ter curtido anteriormente.  
**Resumo:** Estando no Feed da rede social, aparecerão posts de outras pessoas que o usuário poderá curtir. Caso entre no perfil de alguém, também terá a possibilidade de realizar a curtida por lá.  
**Observação:** Isso só será possível caso o usuário esteja logado; caso contrário, o sistema retornará um "Warning" informando que o mesmo não possui conta ou não está autenticado.  

---

## 010 - Tirar a curtida da postagem
**Pré-condições:** A postagem precisa estar curtida.  
**Resumo:** Ao visualizar uma postagem que o usuário havia curtido anteriormente, ele pode retirar a curtida ao clicar no mesmo botão de curtir.
**Observação:** Isso só será possível caso o usuário esteja logado; caso contrário, o sistema retornará um "Warning" informando que o mesmo não possui conta ou não está autenticado.  


---

## 011 - Ver Feed
**Pré-condições:** Não há.  
**Resumo:** Ao acessar o feed, o sistema exibe uma lista de postagens recentes de outros usuários, com conteúdos como textos, imagens ou vídeos, ordenados cronologicamente ou por filtragem (dependendo da configuração do usuário). O feed é visível para todos, permitindo que qualquer usuário explore o conteúdo. No entanto, as opções de interação, como curtir ou comentar, só estarão disponíveis se o usuário estiver logado.  
**Observação:** Se o usuário tentar interagir com uma postagem sem estar logado, o sistema deve exibir uma mensagem informando que é necessário fazer login. Caso a conexão com a internet seja interrompida, o sistema deve exibir um aviso indicando que o feed não pôde ser carregado e sugerir uma nova tentativa quando a conexão for restabelecida.  

---

## 012 - Acessar perfil
**Pré-condições:** Não há.  
**Resumo:** Ao clicar no ícone ou nome de quem publicou uma postagem, o usuário acessa a página de perfil do autor, podendo ver postagens, comentários e repositórios, além de seguir a pessoa ou comunidade.  
**Observação:**  

---

## 013 - Seguir perfil
**Pré-condições:** O usuário deve estar logado e não deve estar seguindo o perfil em questão.  
**Resumo:** Permite que o usuário siga o perfil de outro usuário ou comunidade, recebendo atualizações no feed.  
**Observação:** O perfil será adicionado à lista de seguidos.  

---

## 014 - Deixar de seguir perfil
**Pré-condições:** O usuário deve estar logado e deve estar seguindo o perfil em questão.  
**Resumo:** Permite que o usuário deixe de seguir uma conta. O botão "seguindo" será atualizado para "seguir".  
**Observação:** Essa ação reflete apenas no feed "quem você segue".  

---

## 015 - Favoritar repositório
**Pré-condições:** O usuário deve estar autenticado e o repositório não pode ter sido favoritado.  
**Resumo:** Ao entrar no repositório, o usuário pode favoritar, salvando-o na página de "salvos".  
**Observação:**  


---

## 016 - Criar categoria (Moderador)
**Pré-condições:** O moderador deve estar autenticado.  
**Resumo:** Permite ao moderador criar categorias, como disciplinas e tecnologias, acessando uma seção específica.  
**Observação:**

---

## 017 - Denunciar publicação 
**Pré-condições:** O usuário deve estar logado na plataforma.<br>
**Resumo:** Permite que o usuário denuncie uma publicação por violação das normas da plataforma.<br>
**Observação:** A denúncia resulta na remoção ou no mantimento da publicação,  dependendo da análise do moderador.

---

## 018 - Denunciar comentario
**Pré-condições:** O usuário deve estar logado na plataforma.<br>
**Resumo:** Permite que o usuário denuncie um comentário por violação das normas da plataforma.<br>
**Observação:** A denúncia resulta na remoção ou no mantimento do comentário, dependendo da análise do moderador.

---

## 019 - Gerenciar denúncias (moderador)
**Pré-condições:**  O usuário deve possuir permissões administrativas.<br>
**Resumo:** Permite que os moderadores revisem e aprovem ou desaprovem denúncias feitas pelos usuários sobre postagens ou perfis que violem as regras da comunidade.<br>
**Observação:** Cada denúncia deve ser analisada individualmente antes de qualquer ação corretiva.
