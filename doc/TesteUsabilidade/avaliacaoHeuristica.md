# Avaliação Heurística

**Histórico de Alterações:**
| Versão | Autor | Data |
|--------|-------|------|
| 1.0 | Jesrriel Moura | 30 de outubro de 2025 |
| 2.0 | Ana Maria | 08 de novembro de 2025 |

## 1 Introdução

O presente relatório descreve o processo de aplicação da técnica Eureca na análise da
interface do sistema Bizzu. Diferentemente de abordagem original da técnica, que avalia
protótipos de baixa ou média fidelidade, neste estudo a técnica foi aplicada diretamente
sobre o site já implementado.O objetivo da aplicação da técnica foi identificar problemas de
usabilidade, inconsistências de design e possíveis melhorias na interação do usuário com o
sistema, com base com base nas heurísticas Eureca (Matos & Freire).

## 2 Equipe Avaliadora

A avaliação foi conduzida pelos membros da equipe de PDS.
● Jesrriel Moura
● Luiz Fernando
● Luiz Roberto
● Ana Maria
● Fábio Alexandre
Todos os participantes possuem familiaridade com princípios de design e desenvolvimento
de interfaces, o que contribuiu para análises mais precisas e técnicas.

## 3 Metodologia

A técnica Eureca é uma variação estruturada da avaliação heurística, que busca
sistematizar o processo de identificação e classificação de problemas de usabilidade em
interfaces digitais. No caso da interface Bizzu, as etapas foram adaptadas para o contexto
do sistema já implementado.
Etapas realizadas:
**3.1 Definição do escopo**
Foi definido que a análise abrangeria as principais seções do site Bizzu, incluindo os casos
de uso de: Ver feed; Acessar perfil; Manter postagem(crud); Manter repositório(crud);
**3.2 Seleção dos avaliadores**
Todos os avaliadores do grupo foram previamente apresentados à técnica Eureca e aos
critérios heurísticos utilizados.
**3.3 Avaliação individual**
Cada avaliador navegou pelo site e registrou individualmente os problemas de usabilidade observados, de acordo com as heurísticas predefinidas.
- [Avaliação individual de Jesrriel Moura](https://docs.google.com/document/d/1lWJBR_G7x4AZO-XDpDFOh9uhKObl_kDpukrrOXJG0S4/edit?tab=t.0)
- [Avaliação individual de Ana Maria](https://docs.google.com/document/d/1qFEcMAwa7g9IxXBH3h77jmsSkaXh9DXD4SOEMxAN7c8/edit?tab=t.0)
- [Avaliação individual de Fábio Alexandre](https://docs.google.com/document/d/1b25Zc6Hoy-jtHc91OYZMlctgojmON9vWReyXHRU_X8k/edit?tab=t.0)
- [Avaliação individual de Luiz Roberto](https://docs.google.com/document/d/1656WnVOSNcFD-b8m-evAfXOGVrUEpx-XG1eW1USaqg8/edit?usp=sharing)
- [Avaliação individual de Luiz Fernando](https://docs.google.com/document/d/1j7rl6_-cQFJe9WJLkOYAGiex5r1AJ2eeA816IHOmrY4/edit?tab=t.0)

**3.4 Reunião de consolidação**
Após as análises individuais, foi realizado um forms para tornar unânime a classificação de problemas quanto à severidade e frequência.

**3.5 Documentação dos resultados**
Os problemas identificados foram compilados em um relatório conjunto, com sugestões de melhoria para cada um deles.

## 4 Avaliação em Grupo

| N°                                                     | Problema                           | Princípios violados | Sugestão | Gravidade | Esforço | Imagem |
| ------------------------------------------------------ | ---------------------------------- | ------------------- | -------- | --------- | ------- | ------- |
| 01 | Menu de opções (três pontos) exibe “Editar/Excluir” mesmo em postagens de outros usuários | AF1 – Funcionalidade |Exibir “Denunciar” para postagens de terceiros e “Editar/Excluir” apenas para as próprias postagens. | Alta | Moderado | [Imagem 01](#1) |
| 02 | Postagens listadas das mais antigas para as mais novas | FM4 – Ordenação da informação / FM5 – Consistência externa |Exibir postagens mais recentes primeiro, em ordem cronológica inversa.| Alta | Leve | [Imagem 02](#2) |
| 03 | Imagens das postagens sem tamanho padrão | FM14 – Formatação de imagens|Definir altura máxima para imagens e permitir expandir com clique.| Baixa | Leve | [Imagem 03](#3) |
| 04 | Fotos de perfil quebradas ou distorcidas | FM14 – Formatação de imagens / AF9 – Prevenção de erros| Mostrar avatar padrão em caso de falha no carregamento. | Média | Leve | [Imagem 04](#4) |
| 05 | Botão “Cancelar” apaga informações sem confirmação | AF4 – Recuperação de dados perdidos | Exibir modal de confirmação antes de descartar alterações. | Baixa | Leve | [Imagem 05](#5) |
| 06 | Modal de exclusão não reabre sem recarregar a página | AF1 – Funcionalidade | Corrigir lógica para permitir múltiplas aberturas/fechamentos. | Média | Moderado | [Imagem 06](#6) |
| 07 | Criação de postagem/repositório exige muitos cliques | NA5 – Mínimo de cliques / PU4 –Redução do esforço cognitivo | Adicionar botão direto de criação no feed principal. | Média | Leve | [Imagem 07](#7) |
| 08 | Lista de comunidades/repositórios mostra itens não seguidos | AF10 – Restrições / FM3 – Filtragem da informação | Filtrar para mostrar apenas comunidades/usuários seguidos. | Média | Moderado | [Imagem 08](#8) |
| 09 | Alinhamento inconsistente em botões, títulos e campos | FM9 – Alinhamento | Padronizar margens e espaçamento entre títulos, botões e formulários. | Baixa | Leve | [Imagem 09](#9) |
| 10 | Botão “+ Novo” é genérico e causa ambiguidade | PU4 – Redução do esforço cognitivo / NA5 – Mínimo de cliques | Alterar rótulo para “+ Nova Postagem” ou “+ Novo Repositório”. | Média | Leve | [Imagem 10](#10) |
| 11 | Ausência de widget ou opção de acessibilidade visível | AC6 – Destaque das configurações de acessibilidade| Incluir botão flutuante de acessibilidade (ajuste de contraste, fonte etc.). | Alta | Grande | [Imagem 11](#11) |
| 12 | Contraste de textos insuficiente | FM11 – Contraste / AC4 – Contraste de cor | Aumentar contraste entre texto e fundo, seguindo padrões de acessibilidade. | Média | Leve | [Imagem 12](#12) |
| 13 | Falta de affordance (ícones ou dicas) para edição de informações |CO3 – Affordance – dicas| Inserir ícones de edição (lápis/“+”) próximos aos campos editáveis.| Média | Leve | [Imagem 13](#13) |
| 14 | Repositório não atualiza lista de arquivos após edição |AF1 –Funcionalidade | Atualizar automaticamente a lista de arquivos após alterações.| Média | Moderado | [Imagem 14](#14) |
| 15 |Placeholder genérico em campos de criação de postagens e repositórios | AF6 – Sugestão de preenchimento | Tornar o placeholder mais criativo e inspirar o usuário (ex: “Compartilhe o que aprendeu hoje...”).| Baixa | Leve | [Imagem 15](#15) |
| 16 |Formulários e botões desalinhados em relação aos campos| FM9 – Alinhamento | Corrigir alinhamento entre campos, botões e títulos para manter harmonia visual.| Baixa | Leve | [Imagem 16](#16) |
| 17 | Zoom quebra layout nos formulários de criação | AC5 – Possibilidade de ampliação | Adaptar o sistema para funcionar corretamente em diferentes níveis de zoom. | Alta | Grande | [Imagem 17](#17) |
| 18 | Ausência de tela de carregamento no feed | FM16 – Tela de carregamento / CO2 – Feedback adequado | Adicionar spinner ou loader durante o carregamento das postagens. | Média | Moderado | [Imagem 18](#18) |
| 19 | Breadcrumbs (migalhas de pão) ausentes nas telas de navegação | NA4 – Migalhas de pão | Adicionar trilha de navegação para indicar o caminho percorrido e facilitar retorno. | Média | Moderado | [Imagem 19](#19) |
| 20 | Campo “Categorias” indica obrigatoriedade com * mas sem explicação | CO3 – Affordance – dicas | Inserir legenda explicando que campos com * são obrigatórios. | Baixa | Leve | [Imagem 20](#20) |
| 21 | Campo de busca redundante dentro do formulário de criação | FM6 – Consistência interna | Remover campo de busca interno e  manter apenas a busca global no cabeçalho. | Baixa | Leve | [Imagem 21](#21) |
| 22 | Links do menu lateral não têm destaque visual | AC9 – Destaque de links | Aplicar cor diferenciada ou sublinhado para deixar claro que os links são clicáveis | Baixa | Leve | [Imagem 22](#22) |

## Diferenças em relação à aplicação tradicional da técnica
A principal diferença neste trabalho foi que a técnica Eureka foi aplicada sobre um sistema em funcionamento, e não sobre um protótipo. Essa abordagem permitiu observar comportamentos reais da interface, interações dinâmicas e respostas do sistema, oferecendo uma análise mais fiel ao contexto de uso.

### Listagem de imagens correspondentes aos erros encontrados
**Imagem problema 01** <a name="1" > </a> <br>
<img width="798" height="408" alt="image" src="https://github.com/user-attachments/assets/ddca5189-8923-4345-8f87-da85c35d1f4c" /> <br>
**Imagem problema 02** <a name="2" > </a>  <br>
<img width="636" height="468" alt="image" src="https://github.com/user-attachments/assets/3d383a68-bfe9-4eb1-b323-cd9ca428fecd" /> <br>
**Imagem problema 03** <a name="3" > </a> <br>
<img width="745" height="355" alt="image" src="https://github.com/user-attachments/assets/ee755a40-8170-4a09-a6e9-47f249f7b2ca" /> 
<img width="769" height="380" alt="image" src="https://github.com/user-attachments/assets/02987523-d9fb-4b95-9df3-8bae8b67bd4a" /> <br>
**Imagem problema 04** <a name="4" > </a> <br>
<img width="464" height="291" alt="image" src="https://github.com/user-attachments/assets/de09fca5-3951-4411-9899-b148842abbc1" /> <br>
**Imagem problema 05** <a name="5" > </a> <br>
<img width="847" height="409" alt="image" src="https://github.com/user-attachments/assets/b4a017c4-ca2c-4ecf-bd46-7f9eaae0bc9f" />
<img width="846" height="402" alt="image" src="https://github.com/user-attachments/assets/3ebdfa3d-4258-4a23-b1cd-be3a3e2a2a1d" /> <br>
**Imagem problema 06** <a name="6" > </a> <br>
<img width="846" height="402" alt="image" src="https://github.com/user-attachments/assets/a35dcf7f-510d-475f-8664-87f2e6564ea7" /> <br>
**Imagem problema 07** <a name="7" > </a> <br>
<img width="756" height="380" alt="image" src="https://github.com/user-attachments/assets/20dc48ee-1030-476e-aa6f-ca675ae519e9" /> <br>
**Imagem problema 08** <a name="8" > </a> <br>
<img width="337" height="442" alt="image" src="https://github.com/user-attachments/assets/0dfd222a-89ef-43f1-b132-85e9e3306ead" /> <br>
**Imagem problema 09** <a name="9" > </a> <br>
<img width="375" height="554" alt="image" src="https://github.com/user-attachments/assets/31d5dc01-1544-403f-b5a3-05367bdecf3e" /> <br>
**Imagem problema 10** <a name="10" > </a> <br>
<img width="305" height="104" alt="image" src="https://github.com/user-attachments/assets/911d276b-2c2a-40c6-a0f4-07eab0f84b8d" /> <br>
**Imagem problema 11** <a name="11" > </a> <br>
<img width="780" height="394" alt="image" src="https://github.com/user-attachments/assets/3ef73f51-d275-444b-8633-b227e12ac8ce" /> <br> 
**Imagem problema 12** <a name="12" > </a> <br>
<img width="415" height="209" alt="image" src="https://github.com/user-attachments/assets/5bd520df-3993-4358-a143-5141c1aa1c53" /> <br>
**Imagem problema 13** <a name="13" > </a> <br>
<img width="322" height="334" alt="image" src="https://github.com/user-attachments/assets/7b3b4b8d-0e78-44bf-b783-0be32d23ab67" /> <br>
**Imagem problema 14** <a name="14" > </a> <br>
<img width="863" height="420" alt="image" src="https://github.com/user-attachments/assets/402a47a0-22ca-4ddc-982f-ac7091b26827" />
<img width="863" height="420" alt="image" src="https://github.com/user-attachments/assets/ad1d8437-9330-433b-ae14-420c077fe797" />
<img width="863" height="420" alt="image" src="https://github.com/user-attachments/assets/1572d8d3-d766-4e9e-acf7-637469be681d" /> <br> 
**Imagem problema 15** <a name="15" > </a> <br>
<img width="838" height="405" alt="image" src="https://github.com/user-attachments/assets/0c4d3191-df98-4c79-a327-be7f36e05aea" /> <br>
**Imagem problema 16** <a name="16" > </a> <br>
<img width="857" height="427" alt="image" src="https://github.com/user-attachments/assets/143f599f-07ec-4b19-bb40-df5053a2726f" /> <br>
**Imagem problema 17** <a name="17" > </a> <br>
<img width="857" height="427" alt="image" src="https://github.com/user-attachments/assets/6dd6581e-a940-4df2-be48-16925ad6e5b3" /> <br>
**Imagem problema 18** <a name="18" > </a> <br>
<img width="699" height="350" alt="image" src="https://github.com/user-attachments/assets/bc5c3a55-d66e-42a3-84ca-bd2d194bad67" /> <br>
**Imagem problema 19** <a name="19" > </a> <br>
<img width="860" height="442" alt="image" src="https://github.com/user-attachments/assets/f4986d77-ddee-4974-9f1e-bb408e22512c" /> <br>
**Imagem problema 20** <a name="20" > </a> <br>
<img width="564" height="600" alt="image" src="https://github.com/user-attachments/assets/c1001b6b-177f-40f1-a499-795571bf6e4c" /> <br>
**Imagem problema 21** <a name="21" > </a> <br>
<img width="366" height="280" alt="image" src="https://github.com/user-attachments/assets/b5fbec9c-e64b-4443-9faf-be2e2811915f" /> <br>
**Imagem problema 22** <a name="22" > </a> <br>
<img width="379" height="259" alt="image" src="https://github.com/user-attachments/assets/d5fb7ba5-06ff-4e57-baad-2a50df57dc4f" /> <br>



