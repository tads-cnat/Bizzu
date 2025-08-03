import os
import sys
import django
from datetime import datetime, timedelta, date
import random
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image

# Configurar Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario, Categoria, Comunidade, Postagem, Repositorio, Arquivo

def criar_imagem_placeholder(width=400, height=300, color=(100, 149, 237)):
    """Cria uma imagem placeholder simples"""
    img = Image.new('RGB', (width, height), color=color)
    buffer = BytesIO()
    img.save(buffer, format='JPEG')
    buffer.seek(0)
    return ContentFile(buffer.read(), name=f'placeholder_{width}x{height}.jpg')

def limpar_dados():
    """Remove todos os dados existentes"""
    print("🧹 Limpando dados existentes...")
    
    # Ordem importante devido às foreign keys
    Arquivo.objects.all().delete()
    Repositorio.objects.all().delete()
    Postagem.objects.all().delete()
    Usuario.objects.all().delete()
    Comunidade.objects.all().delete()
    Categoria.objects.all().delete()
    
    print("✅ Dados limpos com sucesso!")

def criar_categorias():
    """Cria as categorias do sistema"""
    print("📚 Criando categorias...")
    
    # Tecnologias/Linguagens de Programação
    tecnologias = [
        "Python", "JavaScript", "Java", "C++", "C#", "PHP", "Ruby", "Go", 
        "Rust", "TypeScript", "React", "Vue.js", "Angular", "Node.js", 
        "Django", "Flask", "Spring", "Laravel"
    ]
    
    # Matérias do curso TADS
    materias = [
        "Algoritmos e Programação", "Estrutura de Dados", "Banco de Dados",
        "Engenharia de Software", "Redes de Computadores", "Sistemas Operacionais",
        "Programação Web", "Programação Mobile", "Análise de Sistemas",
        "Gestão de Projetos", "Interface Humano-Computador", "Segurança da Informação",
        "Inteligência Artificial", "Matemática Discreta", "Estatística"
    ]
    
    # Períodos
    periodos = ["1º Período", "2º Período", "3º Período", "4º Período", "5º Período", "6º Período"]
    
    categorias_criadas = []
    
    # Criar categorias de tecnologia
    for tech in tecnologias:
        categoria = Categoria.objects.create(
            nome=tech,
            tipo="tec"
        )
        categorias_criadas.append(categoria)
        print(f"  ✅ Tecnologia: {tech}")
    
    # Criar categorias de matérias
    for materia in materias:
        categoria = Categoria.objects.create(
            nome=materia,
            tipo="mat"
        )
        categorias_criadas.append(categoria)
        print(f"  ✅ Matéria: {materia}")
    
    # Criar categorias de períodos
    for periodo in periodos:
        categoria = Categoria.objects.create(
            nome=periodo,
            tipo="per"
        )
        categorias_criadas.append(categoria)
        print(f"  ✅ Período: {periodo}")
    
    print(f"📚 {len(categorias_criadas)} categorias criadas!")
    return categorias_criadas

def criar_comunidades():
    """Cria as comunidades do sistema"""
    print("🏘️ Criando comunidades...")
    
    comunidades_data = [
        {
            "nome": "TADS",
            "descricao": "Comunidade do curso de Tecnologia em Análise e Desenvolvimento de Sistemas",
            "anoFundacao": date(2020, 3, 15),  # Data válida
            "coordenacao": "Prof. Dr. João Silva",
            "linkPPC": "https://exemplo.com/ppc-tads",
            "linkHorarios": "https://exemplo.com/horarios-tads",
            "linkExtra": "https://exemplo.com/extra-tads"
        },
        {
            "nome": "InfoWeb",
            "descricao": "Comunidade focada em desenvolvimento web e tecnologias da informação",
            "anoFundacao": date(2019, 8, 22),  # Data válida
            "coordenacao": "Prof. Dra. Maria Santos",
            "linkPPC": "https://exemplo.com/ppc-infoweb",
            "linkHorarios": "https://exemplo.com/horarios-infoweb",
            "linkExtra": "https://exemplo.com/extra-infoweb"
        },
        {
            "nome": "REDES",
            "descricao": "Comunidade de Redes de Computadores e Infraestrutura de TI",
            "anoFundacao": date(2018, 11, 5),  # Data válida
            "coordenacao": "Prof. Dr. Carlos Oliveira",
            "linkPPC": "https://exemplo.com/ppc-redes",
            "linkHorarios": "https://exemplo.com/horarios-redes",
            "linkExtra": "https://exemplo.com/extra-redes"
        }
    ]
    
    comunidades_criadas = []
    
    for data in comunidades_data:
        comunidade = Comunidade.objects.create(**data)
        comunidades_criadas.append(comunidade)
        print(f"  ✅ Comunidade: {data['nome']} (fundada em {data['anoFundacao']})")
    
    print(f"🏘️ {len(comunidades_criadas)} comunidades criadas!")
    return comunidades_criadas

def criar_usuarios():
    """Cria os usuários do sistema"""
    print("👥 Criando usuários...")
    
    usuarios_data = [
        {
            "username": "luizfernando",
            "nome": "Luiz Fernando",
            "email": "luiz.fernando@email.com",
            "descricao": "Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Sempre em busca de novos desafios!",
            "escolaFormacao": "ETEC São Paulo",
            "instituicaoAtual": "IFSP - Campus São Paulo",
            "linkedinUrl": "https://linkedin.com/in/luizfernando",
            "papel": "int"
        },
        {
            "username": "luizroberto",
            "nome": "Luiz Roberto",
            "email": "luiz.roberto@email.com",
            "descricao": "Especialista em desenvolvimento mobile e UI/UX. Criando experiências digitais incríveis!",
            "escolaFormacao": "Colégio Técnico Industrial",
            "instituicaoAtual": "FATEC São Paulo",
            "linkedinUrl": "https://linkedin.com/in/luizroberto",
            "papel": "int"
        },
        {
            "username": "anamaria",
            "nome": "Ana Maria",
            "email": "ana.maria@email.com",
            "descricao": "Analista de sistemas com foco em banco de dados e arquitetura de software. Dados são minha paixão!",
            "escolaFormacao": "CEFET-MG",
            "instituicaoAtual": "PUC Minas",
            "linkedinUrl": "https://linkedin.com/in/anamaria",
            "papel": "mod"
        },
        {
            "username": "fabio",
            "nome": "Fabio",
            "email": "fabio@email.com",
            "descricao": "DevOps Engineer e entusiasta de cloud computing. Automatizando o mundo, um script por vez!",
            "escolaFormacao": "SENAI",
            "instituicaoAtual": "UNICAMP",
            "linkedinUrl": "https://linkedin.com/in/fabio",
            "papel": "int"
        },
        {
            "username": "riel",
            "nome": "Riel",
            "email": "riel@email.com",
            "descricao": "Desenvolvedor backend especializado em Python e Django. Código limpo é código feliz!",
            "escolaFormacao": "IFMG",
            "instituicaoAtual": "UFMG",
            "linkedinUrl": "https://linkedin.com/in/riel",
            "papel": "int"
        }
    ]
    
    usuarios_criados = []
    
    for data in usuarios_data:
        # Criar usuário
        usuario = Usuario.objects.create_user(
            username=data["username"],
            email=data["email"],
            password="senha123",  # Senha padrão para todos
            nome=data["nome"],
            descricao=data["descricao"],
            escolaFormacao=data["escolaFormacao"],
            instituicaoAtual=data["instituicaoAtual"],
            linkedinUrl=data["linkedinUrl"],
            papel=data["papel"]
        )
        
        # Adicionar imagem de perfil placeholder
        try:
            img = criar_imagem_placeholder(200, 200, (random.randint(100, 255), random.randint(100, 255), random.randint(100, 255)))
            usuario.imagemPerfil.save(f'{data["username"]}_avatar.jpg', img, save=True)
        except Exception as e:
            print(f"  ⚠️ Erro ao criar imagem para {data['nome']}: {e}")
        
        usuarios_criados.append(usuario)
        print(f"  ✅ Usuário: {data['nome']} (@{data['username']})")
    
    print(f"👥 {len(usuarios_criados)} usuários criados!")
    return usuarios_criados

def criar_postagens(usuarios, comunidades, categorias):
    """Cria postagens para cada usuário"""
    print("📝 Criando postagens...")
    
    # Templates de postagens por categoria
    postagens_templates = {
        "tecnologia": [
            "Acabei de descobrir uma nova funcionalidade incrível do {tech}! Alguém mais já testou?",
            "Implementando um projeto com {tech} e estou impressionado com a performance!",
            "Dica rápida: {tech} tem uma curva de aprendizado interessante, mas vale muito a pena!",
            "Quem mais está usando {tech} em projetos reais? Vamos trocar experiências!",
            "Tutorial completo de {tech} que encontrei e recomendo para iniciantes.",
            "Comparando {tech} com outras tecnologias similares. Resultados surpreendentes!",
            "Meu primeiro projeto com {tech} foi um sucesso! Compartilhando a experiência.",
            "Debugando código {tech} há horas... mas finalmente funcionou! 🎉",
            "Workshop de {tech} foi incrível! Aprendizado garantido para todos.",
            "Contribuindo para projetos open source em {tech}. Comunidade fantástica!"
        ],
        "materia": [
            "Estudando {materia} e descobrindo conceitos fascinantes!",
            "Projeto final de {materia} está tomando forma. Animado com os resultados!",
            "Alguém tem dicas de bibliografia para {materia}? Preciso de referências!",
            "Apresentação de {materia} foi um sucesso! Trabalho em equipe fez a diferença.",
            "Aplicando conceitos de {materia} em projetos práticos. Teoria na prática!",
            "Dúvidas sobre {materia}? Vamos formar um grupo de estudos!",
            "Professor de {materia} trouxe um case real incrível para a aula.",
            "Prova de {materia} na próxima semana. Quem quer estudar junto?",
            "Seminário de {materia} abriu minha mente para novas possibilidades.",
            "Estágio aplicando conhecimentos de {materia}. Experiência única!"
        ],
        "geral": [
            "Que semana intensa de estudos! Mas valeu cada minuto investido.",
            "Networking é fundamental na nossa área. Conectem-se comigo!",
            "Participando de um hackathon no fim de semana. Quem mais vai estar lá?",
            "Lendo um livro incrível sobre desenvolvimento pessoal na carreira tech.",
            "Palestra sobre inovação tecnológica foi inspiradora hoje!",
            "Mentoria com profissionais experientes faz toda a diferença.",
            "Certificação conquistada! Mais um passo na jornada profissional.",
            "Evento de tecnologia da região foi excepcional. Recomendo para todos!",
            "Projeto integrador está desafiador, mas a equipe está unida!",
            "Reflexão: como a tecnologia está transformando nossa sociedade?"
        ]
    }
    
    postagens_criadas = []
    
    for usuario in usuarios:
        print(f"  📝 Criando postagens para {usuario.nome}...")
        
        # Criar 5-8 postagens por usuário
        num_postagens = random.randint(5, 8)
        
        for i in range(num_postagens):
            # Escolher tipo de postagem
            tipo_postagem = random.choice(["tecnologia", "materia", "geral"])
            
            if tipo_postagem == "tecnologia":
                tech_cats = [c for c in categorias if c.tipo == "tec"]
                if tech_cats:
                    categoria_escolhida = random.choice(tech_cats)
                    texto = random.choice(postagens_templates["tecnologia"]).format(tech=categoria_escolhida.nome)
                    categorias_post = [categoria_escolhida.id]
                else:
                    texto = random.choice(postagens_templates["geral"])
                    categorias_post = []
            
            elif tipo_postagem == "materia":
                mat_cats = [c for c in categorias if c.tipo == "mat"]
                if mat_cats:
                    categoria_escolhida = random.choice(mat_cats)
                    texto = random.choice(postagens_templates["materia"]).format(materia=categoria_escolhida.nome)
                    categorias_post = [categoria_escolhida.id]
                else:
                    texto = random.choice(postagens_templates["geral"])
                    categorias_post = []
            
            else:
                texto = random.choice(postagens_templates["geral"])
                # Adicionar algumas categorias aleatórias
                cats_aleatorias = random.sample(categorias, min(3, len(categorias)))
                categorias_post = [c.id for c in cats_aleatorias]
            
            # Escolher comunidade aleatória
            comunidade = random.choice(comunidades)
            
            # Criar postagem
            postagem = Postagem.objects.create(
                texto=texto,
                usuario=usuario,
                comunidade=comunidade
            )
            
            # Adicionar categorias
            if categorias_post:
                postagem.categorias.set(categorias_post)
            
            # Algumas postagens terão imagens
            if random.choice([True, False, False]):  # 33% chance de ter imagem
                try:
                    img = criar_imagem_placeholder(600, 400, (random.randint(50, 255), random.randint(50, 255), random.randint(50, 255)))
                    postagem.imagem.save(f'post_{postagem.id}.jpg', img, save=True)
                except Exception as e:
                    print(f"    ⚠️ Erro ao criar imagem para postagem: {e}")
            
            postagens_criadas.append(postagem)
        
        print(f"    ✅ {num_postagens} postagens criadas para {usuario.nome}")
    
    print(f"📝 {len(postagens_criadas)} postagens criadas no total!")
    return postagens_criadas

def criar_repositorios(usuarios, comunidades, categorias):
    """Cria repositórios para cada usuário"""
    print("📦 Criando repositórios...")
    
    # Templates de repositórios
    repositorios_templates = [
        {
            "titulo": "Sistema de Gerenciamento Escolar",
            "descricao": "Sistema completo para gestão de escolas com módulos de alunos, professores, notas e frequência. Desenvolvido com foco na usabilidade e performance."
        },
        {
            "titulo": "E-commerce Responsivo",
            "descricao": "Plataforma de e-commerce moderna e responsiva com carrinho de compras, sistema de pagamento e painel administrativo completo."
        },
        {
            "titulo": "App de Controle Financeiro",
            "descricao": "Aplicativo mobile para controle de finanças pessoais com gráficos, relatórios e sincronização em nuvem."
        },
        {
            "titulo": "API REST para Blog",
            "descricao": "API robusta para sistema de blog com autenticação JWT, CRUD completo e documentação Swagger integrada."
        },
        {
            "titulo": "Dashboard Analytics",
            "descricao": "Dashboard interativo para análise de dados com gráficos dinâmicos, filtros avançados e exportação de relatórios."
        },
        {
            "titulo": "Sistema de Biblioteca",
            "descricao": "Sistema para gerenciamento de biblioteca com controle de empréstimos, reservas e multas. Interface intuitiva e moderna."
        },
        {
            "titulo": "Chat em Tempo Real",
            "descricao": "Aplicação de chat com WebSockets, salas privadas, compartilhamento de arquivos e notificações push."
        },
        {
            "titulo": "Calculadora Científica",
            "descricao": "Calculadora científica avançada com histórico de operações, gráficos de funções e modo programador."
        },
        {
            "titulo": "Sistema de Estoque",
            "descricao": "Sistema completo para controle de estoque com alertas de baixa quantidade, relatórios e integração com fornecedores."
        },
        {
            "titulo": "Portfolio Pessoal",
            "descricao": "Site portfolio responsivo com galeria de projetos, blog integrado e formulário de contato funcional."
        },
        {
            "titulo": "Game 2D em Python",
            "descricao": "Jogo 2D desenvolvido em Python com Pygame, incluindo sistema de pontuação, fases e efeitos sonoros."
        },
        {
            "titulo": "Automação de Tarefas",
            "descricao": "Scripts para automação de tarefas repetitivas com interface gráfica e agendamento de execução."
        },
        {
            "titulo": "Sistema de Votação",
            "descricao": "Plataforma segura para votações online com criptografia, auditoria e resultados em tempo real."
        },
        {
            "titulo": "Conversor de Moedas",
            "descricao": "Aplicação para conversão de moedas com API em tempo real, histórico de cotações e gráficos comparativos."
        },
        {
            "titulo": "Gerador de QR Code",
            "descricao": "Ferramenta para geração de QR Codes personalizados com diferentes formatos e opções de customização."
        }
    ]
    
    repositorios_criados = []
    
    for usuario in usuarios:
        print(f"  📦 Criando repositórios para {usuario.nome}...")
        
        # Criar 3-5 repositórios por usuário
        num_repositorios = random.randint(3, 5)
        repos_usuario = random.sample(repositorios_templates, min(num_repositorios, len(repositorios_templates)))
        
        for repo_data in repos_usuario:
            # Escolher comunidade aleatória
            comunidade = random.choice(comunidades)
            
            # Criar repositório
            repositorio = Repositorio.objects.create(
                titulo=repo_data["titulo"],
                descricao=repo_data["descricao"],
                usuario=usuario,
                comunidade=comunidade
            )
            
            # Adicionar categorias aleatórias (2-4 categorias)
            num_categorias = random.randint(2, 4)
            cats_aleatorias = random.sample(categorias, min(num_categorias, len(categorias)))
            repositorio.categorias.set([c.id for c in cats_aleatorias])
            
            # Criar alguns arquivos para o repositório
            criar_arquivos_repositorio(repositorio)
            
            repositorios_criados.append(repositorio)
        
        print(f"    ✅ {len(repos_usuario)} repositórios criados para {usuario.nome}")
    
    print(f"📦 {len(repositorios_criados)} repositórios criados no total!")
    return repositorios_criados

def criar_arquivos_repositorio(repositorio):
    """Cria arquivos de exemplo para um repositório"""
    arquivos_exemplos = [
        "README.md",
        "main.py",
        "index.html",
        "style.css",
        "script.js",
        "requirements.txt",
        "package.json",
        "database.sql",
        "config.json",
        "documentation.pdf"
    ]
    
    # Criar 2-4 arquivos por repositório
    num_arquivos = random.randint(2, 4)
    arquivos_selecionados = random.sample(arquivos_exemplos, min(num_arquivos, len(arquivos_exemplos)))
    
    for nome_arquivo in arquivos_selecionados:
        # Criar arquivo fictício
        conteudo = f"# Arquivo {nome_arquivo} do repositório {repositorio.titulo}\n\nConteúdo de exemplo..."
        arquivo_content = ContentFile(conteudo.encode('utf-8'), name=nome_arquivo)
        
        Arquivo.objects.create(
            repositorio=repositorio,
            arquivo=arquivo_content
        )

def main():
    """Função principal que executa todo o processo de população"""
    print("🚀 Iniciando população do banco de dados...")
    print("=" * 50)
    
    try:
        # Limpar dados existentes
        limpar_dados()
        
        # Criar dados na ordem correta
        categorias = criar_categorias()
        comunidades = criar_comunidades()
        usuarios = criar_usuarios()
        
        # Fazer alguns usuários seguirem outros
        print("🤝 Criando relacionamentos entre usuários...")
        for usuario in usuarios:
            # Cada usuário segue 1-3 outros usuários aleatoriamente
            outros_usuarios = [u for u in usuarios if u != usuario]
            seguir = random.sample(outros_usuarios, min(random.randint(1, 3), len(outros_usuarios)))
            usuario.segue.set(seguir)
            
            # Cada usuário segue 1-2 comunidades aleatoriamente
            seguir_comunidades = random.sample(comunidades, random.randint(1, 2))
            usuario.comunidades_que_sigo.set(seguir_comunidades)
        
        print("✅ Relacionamentos criados!")
        
        # Criar postagens e repositórios
        postagens = criar_postagens(usuarios, comunidades, categorias)
        repositorios = criar_repositorios(usuarios, comunidades, categorias)
        
        print("=" * 50)
        print("🎉 POPULAÇÃO CONCLUÍDA COM SUCESSO!")
        print(f"📊 Resumo:")
        print(f"   👥 Usuários: {len(usuarios)}")
        print(f"   📚 Categorias: {len(categorias)}")
        print(f"   🏘️ Comunidades: {len(comunidades)}")
        print(f"   📝 Postagens: {len(postagens)}")
        print(f"   📦 Repositórios: {len(repositorios)}")
        print(f"   📁 Arquivos: {sum(repo.arquivos.count() for repo in repositorios)}")
        print("=" * 50)
        print("🔑 Credenciais de login:")
        print("   Usuários: luizfernando, luizroberto, anamaria, fabio, riel")
        print("   Senha: senha123 (para todos)")
        print("   Ana Maria é moderadora (papel: mod)")
        print("   Demais são internautas (papel: int)")
        
    except Exception as e:
        print(f"❌ Erro durante a população: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
