# Casos de Uso

![alt text](<UseCase Diagram0.svg>)

## Listagem das prioridades

1. [CDU-005 - Manter postagem](cdu-005/detalhamento-005.md)
2. [CDU-001 - Manter repositório](cdu-001/detalhamento-001.md)
3. [CDU-011 - Ver feed](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
4. [CDU-012 - Acessar perfil](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
5. [CDU-021 - Manter comunidade ](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
6. [CDU-003 - Pesquisar conteúdo](cdu-003/detalhamento-003.md)
7. [CDU-002 - Manuntenção do perfil pessoal](cdu-002/detalhamento-002.md)
8. [CDU-008 - Filtrar conteúdo](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
9. [CDU-013 - Gerenciar seguidores ](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
10. [CDU-018 - Gerenciar denúncias](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
11. [CDU-016 - Denunciar publicação](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
12. [CDU-017 - Denunciar comentário](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
13. [CDU-019 - Alterar papel](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
14. [CDU-020 - Solicitar mudança de papel](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
15. [CDU-014 - Favoritar repositório](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
16. [CDU-007 - Comentar postagem](cdu-007/detalhamento-007.md)
17. [CDU-015 - Criar categoria (Moderador)](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
18. [CDU-009 - Curtir Postagem](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
19. [CDU-010 - Remover Curtida da Postagem](https://github.com/tads-cnat/Bizzu/blob/main/doc/cdu/casos-de-uso-completos.md)
20. [CDU-006 - Fazer cadastro](cdu-006/detalhamento-006.md)
21. [CDU-004 - Fazer login](cdu-004/detalhamento-004.md)

## Especificações de Casos de Uso

### 001 - Manter repositório

**Pré-condições:** O usuário deve estar autenticado no sistema.  
**Resumo:** Ao acessar seu perfil, o usuário pode criar um repositório pelo botão "Novo", informando título, arquivos e, opcionalmente, categorias. É possível editar ou excluir o repositório a qualquer momento. Os repositórios são exibidos no feed principal, dos seguidores, da comunidade associada e no perfil do usuário.
**Observação:** Os fluxos principais incluem visualização, criação, edição e exclusão. Fluxos de exceção devem considerar falhas na busca, exclusão ou atualização do repositório.<br>
<a href="doc/cdu/cdu-001/detalhamento-001.md"> **Detalhamento** </a>

---

### 002 - Manutenção perfil pessoal

**Pré-condições:** O usuário deve estar autenticado no sistema.  
**Resumo:** O usuário acessa a seção de perfil pessoal e pode editar dados como nome, foto de perfil e texto do perfil, além de atualizar a seção de educação e gerenciar conteúdos salvos. O sistema valida as informações fornecidas e salva os dados atualizados.  
**Observação:** Campos obrigatórios ou inválidos devem gerar mensagens de erro. Problemas de conexão durante a atualização devem alertar o usuário sobre a falha.<br>
<a href="doc/cdu/cdu-002/detalhamento-002.md"> **Detalhamento** </a>

---

### 003 - Pesquisar Usuario

**Pré-condições:** O usuário deve estar autenticado no sistema.
**Resumo:** Permite ao usuário buscar por outros usuários do sistema digitando termos (nome ou @username) na barra de busca.
**Observação:** Caso não exista nenhum usuário com o username pesquisado, nemhum perfil será exibido.<br>
<a href="doc/cdu/cdu-003/detalhamento-003.md"> **Detalhamento** </a>

---

### 004 - Fazer login

**Pré-condições:** O usuário ainda não está autenticado no sistema.  
**Resumo:** O usuário não autenticado acessa a tela inicial e clica em "Entrar". Informa e-mail ou nome de usuário e senha para autenticar-se no sistema.  
**Observação:** Algumas funcionalidades do sistema estão disponíveis apenas para usuários autenticados.<br>
<a href="doc/cdu/cdu-004/detalhamento-004.md"> **Detalhamento** </a>

---

### 005 - Manter postagens

**Pré-condições:** O usuário deve estar autenticado no sistema.
**Resumo:** O usuário pode criar postagens pelo botão "novo", selecionando "nova postagem". Deve incluir conteúdo (texto, imagem ou vídeo), comunidade e categoria. Postagens podem ser editadas ou excluídas e são exibidas no feed principal, de seguidores, comunidades e perfil pessoal.
**Observação:** Os fluxos principais incluem visualização, criação, edição e exclusão. Fluxos de exceção devem considerar falhas na busca, exclusão ou atualização da postagem.<br>
<a href="doc/cdu/cdu-005/detalhamento-005.md"> **Detalhamento** </a>

---

### 006 - Fazer cadastro

**Pré-condições:** O usuário ainda não está autenticado no sistema.  
**Resumo:** No feed, o usuário pode criar uma conta clicando em "fazer cadastro" no pop-up ou em "entrar". Deve informar nome de usuário, e-mail e senha. Após confirmar, escolhe comunidades e cria o perfil.
**Observação:** O sistema deve fornecer feedback de conclusão do cadastro, como um pop-up.<br>
<a href="doc/cdu/cdu-006/detalhamento-006.md"> **Detalhamento** </a>

---

### 007 - Comentar

**Pré-condições:** O usuário deve estar autenticado no sistema.
**Resumo:** Ao clicar no ícone de comentário ("balãozinho") de uma postagem, um pop-up de comentários é aberto para que o usuário possa responder à postagem.  
**Observação:** Caso o usuário feche a postagem sem ter confirmado a resposta, a mensagem é descartada.<br>
<a href="doc/cdu/cdu-007/detalhamento-007.md"> **Detalhamento** </a>

---

### 008 - Filtrar conteúdo

**Pré-condições:** O usuário deve estar autenticado no sistema.  
**Resumo:** O usuário acessa o botão de filtro no feed, seleciona critérios em três categorias distintas com suas respectivas tags. O sistema filtra e atualiza a página exibindo apenas os resultados correspondentes.
**Observação:** Caso não existam resultados para os critérios selecionados, o sistema mostrará uma mensagem informando que não há itens correspondentes.

---

### 009 - Curtir Postagem

**Pré-condições:** O usuário deve estar autenticado no sistema.  
**Resumo:** O usuário clica no ícone de "curtir" em uma postagem para registrar sua reação. O sistema contabiliza a curtida e atualiza a interface.
**Observação:** O usuário só pode curtir uma postagem uma vez. Ao curtir, o ícone é atualizado visualmente.

---

### 010 - Remover Curtida da Postagem

**Pré-condições:** O usuário deve estar autenticado no sistema.  
**Resumo:** O usuário clica novamente no ícone de "curtir" para remover sua reação. O sistema desfaz a curtida e atualiza a interface.
**Observação:** A remoção da curtida é imediata e restaura o ícone ao estado original.

---

### 011 - Ver Feed

**Pré-condições:** Não há.  
**Resumo:** O visitante acessa o site e visualiza o feed com postagens públicas, exibidas automaticamente na página inicial, sem necessidade de cadastro ou login.
**Observação:** As opções de interação, como curtir ou comentar, só estarão disponíveis se o usuário estiver autenticado no sistema.

---

### 012 - Acessar perfil

**Pré-condições:** Não há.  
**Resumo:** Ao clicar no nome ou ícone do autor de uma postagem, o usuário acessa o perfil público dessa pessoa ou comunidade, podendo visualizar postagens, comentários e repositórios, além de optar por seguir.
**Observação:** O conteúdo exibido no perfil varia conforme o tipo de usuário (pessoa ou comunidade) e as permissões de visualização definidas.

---

### 013 - Gerenciar seguidores

**Pré-condições:** O usuário deve estar autenticado no sistema.
**Resumo:** O usuário pode seguir ou deixar de seguir o perfil de outro usuário ou comunidade.
**Observação:** O perfil será adicionado à lista de seguidos ou retirado dependendo da ação. Ao seguir, passará a receber atualizações no feed. Ao deixar de seguir, deixará de receber essas atualizações.

---

### 014 - Favoritar repositório

**Pré-condições:** O usuário deve estar autenticado e o repositório não pode ter sido favoritado.  
**Resumo:** Ao entrar no repositório, o usuário pode favoritar, salvando-o na página de "salvos".  
**Observação:**

---

### 015 - Criar categoria (Moderador)

**Pré-condições:** O moderador deve estar autenticado no sistema.  
**Resumo:** Permite ao moderador criar categorias, como disciplinas e tecnologias, acessando uma seção específica.  
**Observação:** O sistema possui três categorias principais pré-definidas: Tecnologia, Período e Curso. Cada uma dessas categorias contém suas próprias subcategorias, chamadas de tags, que são utilizadas para classificar e filtrar as postagens no feed.

---

### 016 - Denunciar publicação

**Pré-condições:** O usuário deve estar autenticado no sistema.<br>
**Resumo:** O usuário pode denunciar uma publicação por violação das normas da plataforma.<br>
**Observação:** A denúncia resulta na remoção ou no mantimento da publicação, dependendo da análise do moderador.

---

### 017 - Denunciar comentario

**Pré-condições:** O usuário deve estar autenticado no sistema.<br>
**Resumo:** O usuário pode denunciar um comentário por violação das normas da plataforma..<br>
**Observação:** A denúncia resulta na remoção ou no mantimento do comentário, dependendo da análise do moderador.

---

### 018 - Gerenciar denúncias (moderador)

**Pré-condições:** O usuário deve estar autenticado no sistema e possuir permissão de moderador.<br>
**Resumo:** Permite que os moderadores revisem e aprovem ou desaprovem denúncias feitas pelos usuários sobre postagens ou perfis que violem as regras da comunidade.<br>
**Observação:** Cada denúncia deve ser analisada individualmente antes de qualquer ação corretiva.

---

### 019 - Alterar papel (moderador)

**Pré-condições:** O usuário deve estar autenticado no sistema e possuir permissão de moderador.<br>
**Resumo:** Permite que os moderadores revisem e aprovem ou desaprovem solicitações de mudança de papel feita por usuário internauta que deseja se tornar um moderador.<br>

---

### 020 - Solicitar mudança de papel (internauta)

**Pré-condições:** O usuário deve estar autenticado no sistema e não possuir permissão de moderador.<br>
**Resumo:** Permite que os internautas possam solocitar o papel de moderador do sistema para que assim consigam as permissões para revisões de denúncias e criação de categorias.<br>

---

### 021 - Manter comunidades (administrador)

**Pré-condições:** O usuário deve estar autenticado no sistema e possuir permissão de administrador.<br>
**Resumo:** Permite que o administrador crie uma comunidade pertencente a sua instituição através do botão "Novo", informando o nome, descrição e, opcionalmente, foto de perfil, coordenador e links importantes. É possível editar o perfil da comunidade ou excluir a qualquer momento. As comunidades pertecentes aquele administrador são exibidas no seu perfil.<br>
