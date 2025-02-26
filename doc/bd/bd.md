# Modelo de Dados

## Diagrama ER

![Diagrama bizzu revisado drawio](https://github.com/user-attachments/assets/44aaa333-8d49-4296-ba97-44726ffc8620)


## Modelo Relacional

![Diagrama relacional](https://github.com/user-attachments/assets/c91aadbf-803d-40e5-91ca-4000623c12f2)


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
| Informação educação | Informações sobre escolaridade| TEXT |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Local Trabalho | Informações sobre local de trabalho | CHAR | 30 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Progresso Curso | Informações sobre progresso do curso | CHAR | 20 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Escola Formação | Informações sobre escola de formação | CHAR | 30 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Instituição Atual | Instituição atual | CHAR | 30 | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Imagem Perfil | Imagem de perfil | IMAGE |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Criado_em | Imagem de perfil | DATE |  | &#9745;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |


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
| Informações do curso | informações adicionais sobre o curso da comunidade | TEXT |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Link PPC | link para o PPC | URL |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Link horários | link para os horários | URL |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Link Extra | link para os horários | URL |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Ano Fundação | Data de fundação | DATE |  | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |
| Coordernação | Nome do coordenador| CHAR | 50 | &#9744;  | &#9744; | &#9744; | &#9744; | &#9744; |  |  |



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



