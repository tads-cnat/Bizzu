# CDU002. Nome... 

- **Ator principal**: Estudante 
- **Atores secundários**: ...	 
- **Resumo**: O usuário ao entrar no seu perfil tem a possibilidade de gerenciar suas informações, como editar os dados pessoais, atualizar a seção de educação e gerenciar conteúdos salvos.
- **Pré-condição**: O usuário deve possuir um perfil previamente logado.
- **Pós-Condição**: O sistema deve validar as novas informações e enviar um feedback ao usuário informando a situação das suas alterações.

## Fluxo Principal - [Usuário muda as informações do seu perfil pessoa]
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| O usuário acessa seu perfil pessoal | O sistema mostra a tela de perfil pessoal ao usuário |  
| O usuário clica no botão 'Editar Perfil', localizado na seção de configurações | O sistema exibe a tela de editar perfil ao usuário | 
|  O usuário faz as alterações desejadas, como editar os dados pessoais, atualizar seção de educação ou gerenciar conteúdos salvos que ele deseja | O sistema valida as alterações feitas e logo em seguida mostra o perfil já atualizado ao usuário |  

## Fluxo Excessão - [Informações inválidas]
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
|  O usuário acessa seu perfil pessoal | O sistema mostra a tela de perfil pessoal ao usuário |  
| O usuário clica no botão 'Editar Perfil', localizado na seção de configurações | O sistema exibe a tela de editar perfil ao usuário |
|  O usuário faz as alterações desejadas, porém insere informações inválidas | O sistema impede que a ação seja finalizada, informando que tem algum erro e solicita a correção para que a ação seja finalizada | 

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...