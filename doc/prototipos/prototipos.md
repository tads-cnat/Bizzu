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
## B. Tela 2: Login/cadastro
## C. Tela 3: Feed próprio 
## D. Tela 4: Feed de quem eu sigo
## E. Tela 5: Realizar postagem no feed
## F. Tela 6: Postar repositórios
## G. Tela 7: Acessar repositório
## H. Tela 8: Comunidades do sistema
## I. Tela 9: Perfil da comunidade
## J. Tela 10: Editar perfil
