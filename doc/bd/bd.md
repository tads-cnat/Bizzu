# Modelo de Dados

## Diagrama ER

![alt text](<DER - Bizzu..svg>)


## Modelo Relacional

![alt text](<MR - BIZZU.svg>)



## Dicionário de Dados

--- 
**Tabela** : Perfil

*Descrição* : Responsável por identificar os usuários do sistema

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_username | Identificador único do estudante | VARCHAR | 45 | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  | Not null |
| Nome | Nome do estudante| VARCHAR | 200 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null | 
| Email | Email do estudante| VARCHAR |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Descrição | Descrição do estudante| TEXT |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Escola Formação | Informações sobre escola de formação | LONGTEXT |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Criado_em | Imagem de perfil | VARCHAR | 45 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Imagem Perfil | Imagem de perfil | MEDIUMBLOB |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Informação educação | Informações sobre escolaridade| TEXT |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Instituição Atual | Instituição atual | VARCHAR | 45 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Progresso Curso | Informações sobre progresso do curso | INT |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Local Trabalho | Informações sobre local de trabalho | VARCHAR | 45 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |


--- 
**Tabela** : Repositorio

*Descrição* : Armazena e organiza arquivos associados a um perfil com intuito de compartilhamento em uma espécie de "depósito"  virtual

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| Titulo | Titulo do repositório | VARCHAR | 245 | &#9744;  | &#9745; | &#9744; | &#9744; | &#9744; |  | Not null |
| Data de publicação | Data de quando foi postado o repositório | DATE |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  | 
| Descrição | Descrição do que se trata o repositório | TEXT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Comunidade_id_comunidade | Que comunidade está associada a este repositório | INTEGER |  | &#9744;  | &#9744; | &#9745; | &#9744; | &#9745; |  | Not null |
| Perfil_id_username | Que perfil postou o repositório | VARCHAR | 45 | &#9744;  | &#9744; | &#9745; | &#9744; | &#9745; |  | Not null |
| id_repositorio | identificador único do repositório | INTEGER |  | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  |  |


--- 
**Tabela** : Comunidade

*Descrição* : Grupos virtuais associados a cada curso de tecnologia da diatinf

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_comunidade | Identificador único da comunidade | INTEGER |  | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  | Not null |
| Nome | Nome da comunidade | VARCHAR |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Descrição | Descrição da comunidade | VARCHAR |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Ano Fundação | Data de fundação | LONGTEXT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null |
| Coordernação | Nome do coordenador| VARCHAR | 45 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null |
| Link PPC | link para o PPC | MEDIUMTEXT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null |
| Link horários | link para os horários | MEDIUMTEXT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null |
| Link Extra | link para os horários | VARCHAR | 45 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null |



--- 
**Tabela** : Postagem

*Descrição* : Representa conteúdos publicados no sistema, podendo incluir texto, arquivos ou links

*Observações* : ...

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_postagem | Código que identifica cada postagem no banco de dados | INTEGER |  | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  | Not null |
| Data de publicação | Data de quando foi feita a postagem | DATE |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Texto | Texto da postagem | TEXT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Imagem | Imagem da postagem | BIT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Curtir | Curtidas da postagem | BOOLEAN |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Perfil_id_username | Associar qual perfil fez a postagem | VARCHAR | 45 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null |
| Comunidade_id_comunidade | Associar qual comunidade tem essa postagem | INTEGER |  | &#9744;  | &#9744; | &#9745; | &#9744; | &#9744; |  | Not null |


--- 
**Tabela** : Categorias

*Descrição* : Organiza postagens e repositórios, permitindo que estudantes ou visitantes filtrem o conteúdo de forma eficiente e direcionado.

*Observações* : As categorias já são pré-definidas e por isso o tipo de dado do atributo tipo é enum

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_categoria | Identificador único da categoria | VARCHAR | 45 | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  | Not null |
| Nome | Nome da categoria | VARCHAR | 255 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Tecnologia, período, matéria... |
| Tipo | Tipo de categoria(outras restrições) | VARCHAR | 45 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |


--- 
**Tabela** : Arquivos

*Descrição* : Responsável por definir os atributos e características que determinam os tipos de arquivos permitidos dentro de um repositório.

*Observações* : O atributo tipo, é um dado do tipo enum

| Colunas | Descrição | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check | 
| ------- | --------- | ------------ | ------- | ---- | -- | -- | ------ | -------- | ------- | ----- |
| id_arquivos | Identificador dos arquivos  | INTEGER |  | &#9744;  | &#9745; | &#9744; | &#9744; | &#9745; |  | Not null |
| Nome | Nome do arquivo a ser enviado  | VARCHAR | 45 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Tipo | Tipo de arquivo  | VARCHAR | 45 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  | Not null |
| Repositorio_Titulo | Associar a qual repositorio este arquivo pertence  | VARCHAR | 45 | &#9744;  | &#9744; | &#9745; | &#9744; | &#9744; |  | Not null |
| Localização no diretorio | Localização dos arquivos no diretorio   | INTEGER |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |

**Tabela**: Comentario

*Descrição* : Armazena os comentários feitos pelos usuários em postagens do sistema.

*Observações* : Cada comentário está vinculado a uma única postagem e a um único perfil.

| Colunas              | Descrição                                      | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check |
|----------------------|------------------------------------------------|--------------|---------|------|----|----|--------|----------|---------|-------|
| id_comentario        | Identificador único do comentário              | INTEGER      |         | &#9744; | &#9745; | &#9744; | &#9744;   | &#9745;  |         | Not null |
| texto                | Texto do comentário                            | TEXT         |         | &#9744; | &#9744; | &#9744; | &#9744;   | &#9744;  |         |         |
| data_comentario      | Data em que o comentário foi feito             | DATE         |         | &#9744; | &#9744; | &#9744; | &#9744;   | &#9744;  |         |         |
| postagem_id_postagem | Postagem à qual o comentário pertence          | INTEGER      |         | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         | Not null |
| perfil_id_username   | Perfil que fez o comentário                     | VARCHAR      | 45      | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         | Not null |

---
**Tabela**: Curtida

*Descrição* : Representa curtidas feitas pelos usuários em postagens do sistema.

*Observações* : Cada curtida está vinculada a um perfil e a uma postagem.

| Colunas              | Descrição                                    | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check |
|----------------------|----------------------------------------------|--------------|---------|------|----|----|--------|----------|---------|-------|
| id_curtida           | Identificador único da curtida              | INTEGER      |         | &#9744; | &#9745; | &#9744; | &#9744;   | &#9745;  |         | Not null |
| data_curtida         | Data em que a curtida foi feita             | DATE         |         | &#9744; | &#9744; | &#9744; | &#9744;   | &#9744;  |         |         |
| postagem_id_postagem | Postagem que recebeu a curtida              | INTEGER      |         | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         | Not null |
| perfil_id_username   | Perfil que curtiu a postagem                | VARCHAR      | 45      | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         | Not null |

---
**Tabela**: Solicitacao

*Descrição* : Armazena solicitações de entrada em comunidades feitas por usuários.

*Observações* : Pode ser usada para controle de aprovação de membros nas comunidades.

| Colunas                  | Descrição                                     | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check |
|--------------------------|-----------------------------------------------|--------------|---------|------|----|----|--------|----------|---------|-------|
| id_solicitacao           | Identificador único da solicitação           | INTEGER      |         | &#9744; | &#9745; | &#9744; | &#9744;   | &#9745;  |         | Not null |
| data_solicitacao         | Data em que a solicitação foi realizada      | DATE         |         | &#9744; | &#9744; | &#9744; | &#9744;   | &#9744;  |         |         |
| status                   | Status da solicitação (pendente, aceita...)  | VARCHAR      | 45      | &#9744; | &#9744; | &#9744; | &#9744;   | &#9744;  |         |         |
| perfil_id_username       | Perfil que solicitou entrada                  | VARCHAR      | 45      | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         | Not null |
| comunidade_id_comunidade | Comunidade para qual está sendo solicitada   | INTEGER      |         | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         | Not null |

---
**Tabela**: Denuncia

*Descrição* : Armazena denúncias feitas por usuários sobre conteúdos impróprios ou inadequados.

*Observações* : As denúncias podem estar relacionadas a postagens ou comentários.

| Colunas              | Descrição                                           | Tipo de Dado | Tamanho | Null | PK | FK | Unique | Identity | Default | Check |
|----------------------|-----------------------------------------------------|--------------|---------|------|----|----|--------|----------|---------|-------|
| id_denuncia          | Identificador único da denúncia                    | INTEGER      |         | &#9744; | &#9745; | &#9744; | &#9744;   | &#9745;  |         | Not null |
| motivo               | Motivo da denúncia                                 | TEXT         |         | &#9744; | &#9744; | &#9744; | &#9744;   | &#9744;  |         |         |
| data_denuncia        | Data em que a denúncia foi feita                   | DATE         |         | &#9744; | &#9744; | &#9744; | &#9744;   | &#9744;  |         |         |
| perfil_id_username   | Perfil que fez a denúncia                          | VARCHAR      | 45      | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         | Not null |
| postagem_id_postagem | Postagem denunciada (se aplicável)                | INTEGER      |         | &#9745; | &#9744; | &#9745; | &#9744;   | &#9744;  |         |         |
| comentario_id        | Comentário denunciado (se aplicável)              | INTEGER      |         | &#9744; | &#9744; | &#9745; | &#9744;   | &#9744;  |         |         |



