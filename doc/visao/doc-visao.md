# Documento de Visão - Projeto Bizzu 🐝

## Histórico de Revisões

| Data                |  Versão             |          Descrição  |  Autores            |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: |
| - | - | Versão inicial |  - |
| 07/11 | 1.0 | Primeira etapa |  - |
| 11/12 | 2.0 | Segunda etapa |  - |


## 1. Objetivo do projeto

Quando estamos nos referindo à ambientes acadêmicos o contato com novas matérias, pessoas e atividades é um desafio que afeta muitos estudantes, pois quando falamos de problemas que esse tópico desencadeia podemos citar a dificuldade de desempenho nas matérias e socialização, que é impactado pela falta de interação entre estudantes mais experientes e aqueles que estão vivenciando essas etapas pela primeira vez. 

Uma solução viável, seria a criação de uma plataforma semelhante a uma rede social que internamente contaria com a presença de comunidades referentes a cada curso de tecnologia da DIATINF. Essa plataforma possuiria fóruns onde alunos, que teriam seus próprios perfis, fariam postagens. Por sua vez, os perfis dos alunos disporiam de repositórios próprios para a inserção de materiais individuais de estudos.


## 2. Descrição do problema

|     |      |
| --- | --- |
| **Problema**            | Podemos citar a dificuldade de desempenho nas matérias e socialização |
| **Afeta**               | Os estudantes da instituição. |  
| **Impacta**             | Falta de interação entre aqueles que já “passaram” por aquela etapa e aqueles que estão vivenciando pela primeira vez. |
| **Solução**             | Seria a criação de uma espécie de rede social que internamente contaria com a presença de comunidades referentes a cada curso que possuiriam fóruns onde alunos, que teriam seus próprios perfis, fariam comentários. Por sua vez, os perfis dos alunos disporiam de repositórios próprios para a inserção de materiais individuais de estudos. | 

## 3. Descrição dos usuários 

| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| Estudante de tecnologia da DIATINF |  Usuário jovem, na faixa de 18 a 29 anos, cursando Análise e Desenvolvimento de Sistemas, Redes ou Infoweb. Esses estudantes utilizam o sistema para acessar materiais do curso, participar de discussões e colaborar com colegas em atividades acadêmicas. | Acessar e consultar materiais do curso.	/ Colaborar e tirar dúvidas com outros estudantes em projetos e atividades acadêmicas. / Utilizar a plataforma para fazer postagens, criar e discutir ideias, temas e projetos. |
| Administrador da Plataforma | É um usuário com permissões avançadas, Seu principal papel é garantir que as interações entre estudantes ocorram de maneira segura, colaborativa e dentro das diretrizes estabelecidas pelo Bizzu. |Moderação da rede e discussões, garantindo um ambiente colaborativo e respeitoso.	/ Revisão e monitoramento de postagens para evitar conteúdo inapropriado, como agressões e spam. |


## 4. Descrição do ambiente dos usuários

O ambiente ideal em que o usuário-alvo utilizaria nosso site seria em casa ou até mesmo na faculdade, baseado nisso podemos simular o nosso ambiente. Podemos estimular que o número de pessoas envolvidas na execução da tarefa seja 1 pessoa para postagens e no mínimo 2 caso outras pessoas tentem se ajudar. 
Em seguida a duração do ciclo das tarefas e o tempo deve levar no mínimo 30 minutos levando em consideração que a pessoa faria a postagem e em seguida ajudaria algum aluno e a duração de cada atividade seria 10 minutos ou mais para uma postagem e mais de 30 minutos caso seja necessário ajuda mútua entre alunos. 
Na sequência, as restrições ambientais exclusivas não existem, pois o site pode ser utilizado de qualquer lugar, basta ter acesso a internet. 
Quais plataformas de sistemas que são utilizadas hoje? São utilizados principalmente os seguintes aplicativos: Github, Reddit, Linkedin e Google Classroom.
Por fim, quais outros aplicativos estão em uso? É necessário que o seu aplicativo interaja com eles?, provavelmente a pessoa terá outros aplicativos de redes sociais ou algo nesse viés aberto, mas eles não serão necessários para que o nosso site funcione de maneira correta.

## 5. Principais necessidades dos usuários

**1º - Acesso a informações relevantes**

- Causas:
A grande quantidade de informações disponíveis pode gerar confusão sobre quais conteúdos são realmente úteis para as disciplinas do curso e as suas exigências específicas.

- Solução atual:
Para solucionar a grande quantidade de informações disponíveis, as postagens serão categorizadas no momento de sua criação, permitindo posteriormente uma filtragem de conteúdo de acordo com o que o usuário deseja visualizar. 

- Desejos dos usuários:
Filtragem de conteúdo de acordo com quais conteúdos quer visualizar. 

**2ºColaboração acadêmica**

- Causas:
Falta de plataformas que incentivem a colaboração entre os alunos da mesma área por meio de compartilhamento de conteúdos e experiências.

- Soluções atuais:
Existência de comunidades e fóruns informais que incentivam a postagem de conteúdos entre alunos da mesma área.

- Desejos dos usuários:
Espaços dedicados para colaboração acadêmica, incluindo tanto projetos dentro da mesma área quanto projetos interdisciplinares, permitindo que alunos com interesses variados se conectem e colaborem em tempo real através de um fórum. 

**3º Interação com outros estudantes**

- Causas:
Estudantes de diferentes períodos não conseguem inter-relacionar-se de forma íntegra pela falta de formas de interações diretas, pois muitas vezes outras redes sociais não são suficientes para a interação das pessoas que estão no curso.

- Soluções Atuais:
Desenvolvimento de um feed para o compartilhamento de informações, permitindo a criação de postagens e a visualização das postagens de outros usuários, promovendo maior interação por meio de comentários, por exemplo.

- Desejos dos usuários:
Conhecer mais facilmente pessoas de outros períodos do seu curso, além de estudantes de outros cursos.


## 6. Alternativas concorrentes

Nosso projeto tem como concorrentes o Linkedin, o Github, o Reddit, o X, e o Amino. Diante disso, analisaremos os pontos fortes e fracos de cada um desses aplicativos e iremos reutilizar de funcionalidade.

| Concorrentes            |  Pontos positivos         |  Pontos negativos     |  O que iremos re-utilizar e diferenciar          |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: |
| Linkedin | Fórum Extenso / Mecanismo de busca com filtro relacionado a estágio ou postagens comuns | Pressão social relacionado ao objetivo e assuntos da plataforma, que é se destacar|  Mecanismo de filtro, porém ainda mais específico/ Promover união entre as pessoas |
| Github | Presença de repositório | Precisa aprender linguagem git para utilizar repositórios | Repositório de fácil intuitividade |
| Reddit | Presença de comunidades e diversificação delas | Não existe filtro dentro das comunidades por assunto | Comunidades voltadas para o estudantil e filtros por assunto |
| Amino | Comunidades Diversificadas e possibilidade de uma grande customização de perfil |Design desorganizado e confuso, principalmente para encontrar tópicos específicos | Customização de perfil, porém mais simples. Design consistente e filtros para assuntos. |
| X | Aceita grandes quantidades de pessoas e o feed é organizado com os assuntos do momento e muito bem estruturado | As comunidades são muito escondidas e as recomendações são aleatórias | Feed estruturado / Comunidades fáceis de achar|

## 7. Visão geral do produto

**Bizzu** é uma rede social projetada para conectar alunos calouros e veteranos, permitindo que compartilhem e aprendam com experiências diversas relacionadas ao curso e ao estudo de matérias específicas. A proposta inicial é criar um espaço onde cada usuário tenha um perfil pessoal, podendo enviar e acessar materiais de aulas anteriores, provas, trabalhos e relatos sobre suas vivências acadêmicas. 
Na tela inicial, os usuários terão um feed que exibirá atualizações das pessoas que seguem, além de recomendações de comunidades e perfis relevantes quando não houver conteúdo novo. Bizzu visa fomentar a colaboração e o apoio mútuo entre os estudantes, promovendo um ambiente de aprendizado enriquecedor.


## 8. Requisitos funcionais

| Código              |  Nome               |          Descrição  |  
| :-----------------: | :-----------------: | :-----------------: |
| F01 | Upload de arquivos | Na área de repositórios o usuário do sistema  possa colocar arquivos |
| F02 | Categorias dos post | Através de classificação por cores e nomes, é possível ver a seção do conteúdo postado naquele repositório específico ou naquele post específico.Essas categorias seriam a comunidade que o post seria direcionado(infoweb, tads ou redes), matéria, período do curso e tecnológica/linguagem. | 
| F03 | Comentários em postagens | Nas postagens feitas tanto de conteúdos quanto de repositórios é possível que outros usuários comentem. | 
| F04 | Criar ou entrar em uma conta | É necessário o fornecimento de um e-mail, senha e nome de usuário(singular) para ambas as funções. Entretanto, com a opção de escolha entre fornecer e mail ou nome de usuário ao fazer login | 
| F05 | Criar e personalizar perfil pessoal | Ao criar uma conta é possível colocar informações pessoais para efetivação desta criação. Como: Nome(obrigatório), foto(opcional), descrição(opcional), informações da área acadêmica, profissional(opcional)  e comunidade do curso que o mesmo faça parte ou deseja fazer parte futuramente(obrigatório)o perfil continua personalizável após o cadastro. |
| F06 | Realizar publicação do post |Possibilidade do usuário criar uma nova postagem com texto ou imagens e publicá-lo para outras pessoas verem. Nessa postagem será possível ver informações como a data de postagem de um conteúdo, curtidas e comentários. Estas postagens aparecerão em uma espécie de feed. Ao postar, o usuário pode colocar as categorias em que a postagem faz parte. |
| F07 | Realizar publicação de repositório | O usuário poderá realizar a publicação preenchendo informações como título, descrição e categoria de um repositório, subindo arquivos como documentação; códigos; fotos ou arquivos de texto. | 
| F08 | Contato com o bizzu | Possibilidade de entrar em contato com os administradores do sistema para fins de tirar dúvidas. |
| F09 | Favoritar repositório | É possível marcar um repositório como favorito que será armazenado e visualizado posteriormente no perfil pessoal . | 
| F10 | Seguir perfis e comunidades | Possibilidade de filiação a alguma comunidade após a criação da conta e seguir perfis pessoais de outros usuários. No perfil pessoal e no perfil da comunidade é possível visualizar a quantidade de pessoas que seguem a conta, e se tratando apenas do perfil pessoal quantas pessoas aquele usuário segue | 
| F11 | Curtir postagem | Tornar interação mais eficiente, permitindo curtir alguma postagem. | 
| F12 | Pesquisar por categorias com filtro | O usuário poderá como forma de facilitar a pesquisa e o encontro de informações, filtrar por categoria o conteúdo que queira ver. |
| F13 | Sair de uma conta | Possibilidade de se desconectar de uma conta |
| F14 | Buscar por palavras chaves | O usuário poderá pesquisar por palavras chaves e conteúdos de seu interesse. |
| F15 | Visualizar todas as comunidades  | Possibilidade de visualizar as comunidades que existem no sistema. |

## 9. Requisitos não-funcionais

| Código              |  Nome               |          Descrição  |  Categoria          |  Classificação      |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
| NF01 | Utilização python, html/css, figma e sql lite | Para o backend usar django com python e sql lite como banco de dados do próprio framework. Para o template utilizar html/css. Na parte de prototipagem, o figma | Desenvolvimento | Obrigatório  |
| NF02 | Facilidade de navegação | A interface será intuitiva, como a página inicial será acessada logo de início ou o encontro de postagens específicas ser facilmente feitas por meio de filtros | Usabilidade | Obrigatório  |
| NF03 | Consistência  | Manter padrões dos seus similares e da própria interface | Usabilidade | Obrigatório |
| NF04 | Compatibilidade  | O sistema terá compatibilidade com qualquer tipo de navegador | Portabilidade | Desejável |
| NF05 | Autorização de acesso | Autenticação para conseguir adentrar em uma conta pessoal, com email  e senha | Segurança | Obrigatório |
| NF06 | Acessibilidade | Fontes sem serifa, alinhamento do texto à esquerda, presença de ícones, descrição de imagens, títulos descritivos em hiperlinks | Usabilidade | Desejável |
| NF07 | Responsividade | O sistema deve ser responsivo, ou seja, a interface deve se adaptar a diferentes tamanhos de telas. | Usabilidade | Desejável |
