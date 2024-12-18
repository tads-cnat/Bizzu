# Protótipos de Interface com o Usuário

## Mapa do Site

```mermaid
flowchart TD
    A[**Feed] --- B[$$Feed próprio]
    B --- C[$$Feed de quem eu sigo]
    A --- D[**Fazer login]
    D --- E[**Fazer cadastro]
    E --- F[**Criar perfil]
    F --- G[**Escolher comunidade]
    B --- I[$$Visitar perfil]
    B --- H[$$Realizar postagem no feed]
    B --- J[$$Postar repositórios]
    B --- K[$$Acessar repositório]
    B --- L[$$Comunidades do sistema]
    B --- M[$$Perfil da comunidade]
    I --- N[$$Editar perfil]
    I --- H
    I --- J
```
> Legenda:
- $$ (Usuário autenticado)
- ** (Usuário não autenticado)

## A. Tela 1: Feed 
![FEED PRINCIPAL - LOGADO (COM ALTERAÇÕES)](https://github.com/user-attachments/assets/b1c35ec9-5110-4611-bad7-658053c2c84d)


## B. Tela 2: Login/cadastro
![TELA DE CADASTRO](https://github.com/user-attachments/assets/8f4d9693-c2ce-4f3b-80d3-f7891894c9a4)

![LOGIN - DESLOGADO (COM ALTERAÇÕES](https://github.com/user-attachments/assets/f9de1987-f6fc-4135-9c89-c71278424141)

## C. Tela 3: Publicar repositórios
![PERFIL NA MINHA VISÂO - NOVO REPOSITÓRIO](https://github.com/user-attachments/assets/e0288ec5-cfe3-4065-9efe-9d588b293f74)

## D. Tela 4: Publicar postagem
![PERFIL NA MINHA VISÂO - NOVO POST](https://github.com/user-attachments/assets/d0d89710-aa11-48ad-ae82-aa76e70b48b5)

## E. Tela 5: Acessar repositório
![FEED PRINCIPAL - REPOSITÓRIO](https://github.com/user-attachments/assets/975db22a-977d-4bcc-a608-5bd292f3aca6)

## F. Tela 6: Perfil da comunidade
![COMUNIDADES - POSTS](https://github.com/user-attachments/assets/b870a70a-f5d1-4806-8639-fd87652e5167)

## G. Tela 7: Editar perfil
![EDITAR PERFIL](https://github.com/user-attachments/assets/c346ea7f-6042-470b-beb0-5b3af953e21c)

