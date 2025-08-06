# Casos de Uso


![alt text](<UseCase Diagram0.svg>)


## Listagem das prioridades

1. [CDU-005 - Manter postagem](cdu-005/detalhamento-005.md)
2. [CDU-001 - Manter repositório](cdu-001/detalhamento-001.md)
3. [CDU-010 - Ver feed](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
4. [CDU-011 - Acessar perfil](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
5. [CDU-003 - Pesquisar conteúdo](cdu-003/detalhamento-003.md)
6. [CDU-002 - Manuntenção do perfil pessoal](cdu-002/detalhamento-002.md)
7. [CDU-008 - Filtrar conteúdo](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
8. [CDU-012 - Gerenciar seguidores ](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
9. [CDU-017 - Gerenciar denúncias](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
10. [CDU-015 - Denunciar publicação](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
11. [CDU-016 - Denunciar comentário](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
12. [CDU-018 - Alterar papel](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
13. [CDU-019 - Solicitar mudança de papel](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
14. [CDU-013 - Favoritar repositório](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
15. [CDU-007 - Comentar postagem](cdu-007/detalhamento-007.md)
16. [CDU-014 - Criar categoria (Moderador)](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
17. [CDU-009 - Gerenciar Curtida de postagem](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
18. [CDU-006 - Fazer cadastro](cdu-006/detalhamento-006.md)
19. [CDU-004 - Fazer login](cdu-004/detalhamento-004.md)

## Especificações de Casos de Uso

### 001 - Manter repositório

**Pré-condições:** O usuário deve ter uma conta e um perfil autenticado.  
**Resumo:** Ao acessar seu perfil pessoal, o usuário pode criar um repositório ao interagir com o botão "novo" e selecionar a opção "criar novo repositório". Para efetivação, é necessário colocar os arquivos, um título e, opcionalmente, selecionar categorias. Alterações como edição de título, categorias e arquivos, além da exclusão do repositório, são possíveis. A exibição dos repositórios será feita no feed principal, no feed dos seguidores e na comunidade associada, além de estar visível no perfil pessoal do usuário.  
**Observação:** Os fluxos principais incluem visualização, criação, edição e exclusão. Fluxos de exceção devem considerar falhas na busca, exclusão ou atualização do repositório.<br>
<a href="doc/cdu/cdu-001/detalhamento-001.md"> **Detalhamento** </a>

---

### 002 - Manutenção perfil pessoal

**Pré-condições:** O usuário deve possuir um perfil previamente logado.  
**Resumo:** O usuário acessa a seção de perfil pessoal e pode editar dados como nome, foto de perfil e biografia, além de atualizar a seção de educação e gerenciar conteúdos salvos. O sistema valida as informações fornecidas e salva os dados atualizados.  
**Observação:** Campos obrigatórios ou inválidos devem gerar mensagens de erro. Problemas de conexão durante a atualização devem alertar o usuário sobre a falha.<br>
<a href="doc/cdu/cdu-002/detalhamento-002.md"> **Detalhamento** </a>

---

### 003 - Pesquisar conteúdo

**Pré-condições:** Não há.  
**Resumo:** O usuário acessa o campo de pesquisa na interface, e preenche o campo com uma palavra-chave, categoria ou nome de usuário. O sistema processa a solicitação de pesquisa e busca na base de dados, exibindo os resultados filtrados a partir dessa solicitação.  
**Observação:** Caso não exista um conteúdo com a palavra-chave pesquisada pelo usuário, aparecerá uma mensagem indicando que não existe conteúdo correspondente.<br>
<a href="doc/cdu/cdu-003/detalhamento-003.md"> **Detalhamento** </a>

---

### 004 - Fazer login

**Pré-condições:** O usuário não pode estar logado no sistema.  
**Resumo:** Caso o usuário possua uma conta cadastrada no sistema e não esteja logado, ele poderá realizar o login utilizando recursos como e-mail ou nome de usuário e senha. Para autenticar-se, basta clicar no botão "Entrar" do feed principal.  
**Observação:** Algumas funcionalidades do sistema estão disponíveis apenas para usuários autenticados.<br>
<a href="doc/cdu/cdu-004/detalhamento-004.md"> **Detalhamento** </a>

---

### 005 - Manter postagens

**Pré-condições:** O usuário deve possuir uma conta e um perfil autenticado.  
**Resumo:** O usuário pode criar uma nova postagem no feed ou no perfil pessoal, interagindo com o botão "novo" e selecionando "nova postagem". É necessário incluir conteúdo principal (texto, imagem ou vídeo), escolher uma comunidade e uma categoria. É possível editar ou excluir as postagens. As postagens serão exibidas no feed principal, no feed dos seguidores e nas comunidades relacionadas, além do perfil pessoal.  
**Observação:** Os fluxos principais incluem visualização, criação, edição e exclusão. Fluxos de exceção devem considerar falhas na busca, exclusão ou atualização da postagem.<br>
<a href="doc/cdu/cdu-005/detalhamento-005.md"> **Detalhamento** </a>

---

### 006 - Fazer cadastro

**Pré-condições:** O usuário não deve estar autenticado.  
**Resumo:** Ao acessar o feed, o usuário pode criar uma conta ao clicar em "fazer cadastro" no pop-up de aviso ou no botão "entrar". É necessário fornecer nome de usuário, e-mail e senha. Após confirmar, o usuário é direcionado para escolher comunidades e criar o perfil.  
**Observação:** O sistema deve fornecer feedback de conclusão do cadastro, como um pop-up.<br>
<a href="doc/cdu/cdu-006/detalhamento-006.md"> **Detalhamento** </a>

---

### 007 - Comentar

**Pré-condições:** O usuário deve ter cadastro no site e também estar logado.  
**Resumo:** O usuário já devidamente cadastrado e logado, ao clicar no "balãozinho" do post, entra na tela de comentário, onde pode responder à postagem independentemente se a mesma é apenas texto, imagem ou os dois ao mesmo tempo.  
**Observação:** Caso o usuário feche a postagem sem ter confirmado a resposta, a mesma não deve ser registrada no post; ou seja, a mensagem será descartada.<br>
<a href="doc/cdu/cdu-007/detalhamento-007.md"> **Detalhamento** </a>

---

### 008 - Filtrar conteúdo

**Pré-condições:** Não há.  
**Resumo:** O usuário acessa o botão de filtragem e seleciona os critérios que deseja de acordo com as categorias pré-definidas. O sistema aplica essa filtragem e atualiza a página, mostrando apenas os resultados com as categorias escolhidas.  
**Observação:** Caso alguma categoria não seja encontrada, aparecerá uma mensagem indicando que não existe nenhum tipo de resultado.

---

### 009 - Gerenciar Curtida de postagem

**Pré-condições:** O usuário deve estar logado. Caso ainda não tenha curtido a postagem, poderá curti-la. Se já tiver curtido, poderá retirar a curtida.
**Resumo:** Estando no Feed da rede social, aparecerão posts de outras pessoas que o usuário poderá curtir. Caso entre no perfil de alguém, também terá a possibilidade de realizar a curtida por lá. Pórem, caso ele já tenha clicado no botão de curtida ele pode clicar novamente para retirar a mesma.  
**Observação:** Isso só será possível caso o usuário esteja logado; caso contrário, o sistema retornará um "Warning" informando que o mesmo não possui conta ou não está autenticado.

---

### 010 - Ver Feed

**Pré-condições:** Não há.  
**Resumo:** Ao acessar o feed, o sistema exibe uma lista de postagens recentes de outros usuários, com conteúdos como textos, imagens ou vídeos, ordenados cronologicamente ou por filtragem (dependendo da configuração do usuário). O feed é visível para todos, permitindo que qualquer usuário explore o conteúdo. No entanto, as opções de interação, como curtir ou comentar, só estarão disponíveis se o usuário estiver logado.  
**Observação:** Se o usuário tentar interagir com uma postagem sem estar logado, o sistema deve exibir uma mensagem informando que é necessário fazer login. Caso a conexão com a internet seja interrompida, o sistema deve exibir um aviso indicando que o feed não pôde ser carregado e sugerir uma nova tentativa quando a conexão for restabelecida.

---

### 011 - Acessar perfil

**Pré-condições:** Não há.  
**Resumo:** Ao clicar no ícone ou nome de quem publicou uma postagem, o usuário acessa a página de perfil do autor, podendo ver postagens, comentários e repositórios, além de seguir a pessoa ou comunidade.  
**Observação:**

---

### 012 - Gerenciar seguidores

**Pré-condições:** O usuário deve estar logado e não deve estar seguindo o perfil em questão caso ele opte por segui-lo mas caso ele já tenha seguido anteriormente ele pode optar por não seguir mais.  
**Resumo:** Permite que o usuário siga ou deixe de seguir o perfil de outro usuário ou comunidade. Ao seguir, passará a receber atualizações no feed. Ao deixar de seguir, deixará de receber essas atualizações.
**Observação:** O perfil será adicionado à lista de seguidos ou retirado dela.

---

### 013 - Favoritar repositório

**Pré-condições:** O usuário deve estar autenticado e o repositório não pode ter sido favoritado.  
**Resumo:** Ao entrar no repositório, o usuário pode favoritar, salvando-o na página de "salvos".  
**Observação:**

---

### 014 - Criar categoria (Moderador)

**Pré-condições:** O moderador deve estar autenticado.  
**Resumo:** Permite ao moderador criar categorias, como disciplinas e tecnologias, acessando uma seção específica.  
**Observação:**

---

### 015 - Denunciar publicação

**Pré-condições:** O usuário deve estar logado na plataforma.<br>
**Resumo:** Permite que o usuário denuncie uma publicação por violação das normas da plataforma.<br>
**Observação:** A denúncia resulta na remoção ou no mantimento da publicação, dependendo da análise do moderador.

---

### 016 - Denunciar comentario

**Pré-condições:** O usuário deve estar logado na plataforma.<br>
**Resumo:** Permite que o usuário denuncie um comentário por violação das normas da plataforma.<br>
**Observação:** A denúncia resulta na remoção ou no mantimento do comentário, dependendo da análise do moderador.

---

### 017 - Gerenciar denúncias (moderador)

**Pré-condições:** O usuário deve possuir permissões de moderadores.<br>
**Resumo:** Permite que os moderadores revisem e aprovem ou desaprovem denúncias feitas pelos usuários sobre postagens ou perfis que violem as regras da comunidade.<br>
**Observação:** Cada denúncia deve ser analisada individualmente antes de qualquer ação corretiva.

---

### 018 - Alterar papel (moderador)

**Pré-condições:** O usuário deve possuir permissões de moderadores.<br>
**Resumo:** Permite que os moderadores revisem e aprovem ou desaprovem solicitações de mudança de papel feita por usuário comum que deseja se tornar um moderador.<br>

---

### 019 - Solicitar mudança de papel (internauta)

**Pré-condições:** O usuário não deve possuir o papel de moderador<br>
**Resumo:** Permite que os internautas possam solocitar o papel de moderador do sistema para que assim consigam as permissões para revisões de denúncias.<br>
