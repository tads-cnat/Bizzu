from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.contrib.auth import login as login_django
from ..forms import EditarPerfilForm, CadastrarPerfilForm
from django.contrib.auth import authenticate, login as login_django
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import logout
from django.conf import settings
from django.core.paginator import Paginator
from app_bizzu.models.categoria import Categoria
from app_bizzu.models.comunidade import Comunidade
from app_bizzu.models.postagem import Postagem
from app_bizzu.models.usuario import Usuario
from app_bizzu.models.repositorio import Repositorio
from app_bizzu.models.curtida import Curtida
from app_bizzu.models.comentario import Comentario



class UsuarioView:
    @csrf_exempt  # Permite chamadas AJAX sem CSRF Token (se necessário)
    def login(request):
        if request.method == "POST":
            try:
                data = json.loads(request.body)
                username = data.get("username")
                senha = data.get("password")

                user = authenticate(username=username, password=senha)

                if user:
                    login_django(request, user)
                    return JsonResponse({"status": "success", "redirect_url": "/"})
                else:
                    return JsonResponse({"status": "error", "message": "Usuário ou senha inválidos"}, status=400)
            except json.JSONDecodeError:
                return JsonResponse({"status": "error", "message": "Erro no JSON"}, status=400)

        return JsonResponse({"status": "error", "message": "Método não permitido"}, status=405)
    
    @login_required
    def cadastro_perfil(request):
        usuario = request.user  # Obtém o usuário logado

        if request.method == "POST":
            form = CadastrarPerfilForm(request.POST, request.FILES, instance=usuario)
            if form.is_valid():
                form.save()
                return redirect('perfil', username=usuario.username)
        else:
            form = EditarPerfilForm(instance=usuario)

        return render(request, 'cadastro_perfil.html', {'form': form})
    @login_required
    def editarPerfil(request):
        user = request.user  # Pegando o usuário autenticado

        if request.method == "POST":
            form = EditarPerfilForm(request.POST, request.FILES, instance=user)
            if form.is_valid():
                form.save()
                messages.success(request, 'Perfil atualizado com sucesso!')
                return redirect('perfil', username=user.username)
            else:
                messages.error(request, 'Por favor, corrija os erros abaixo.')
        else:
            form = EditarPerfilForm(instance=user)

        return render(request, 'editarPerfil.html', {'form': form})
    
    def sair(request):
        logout(request)  # Desloga o usuário
        return redirect('feed')  # Redireciona para a página de login ou outra página
    
    @login_required
    def seguirPerfil(request, pk):
        perfil_alvo = get_object_or_404(Usuario, id=pk)
        perfil_atual = request.user

        if request.method == "POST":
            acao = request.POST.get("follow")  # Obtém a ação do botão
            
            if acao == "unfollow":
                perfil_atual.segue.remove(perfil_alvo)
                perfil_alvo.seguidores.remove(perfil_atual)
                seguindo = False
            elif acao == "follow":
                perfil_atual.segue.add(perfil_alvo)
                perfil_alvo.seguidores.add(perfil_atual)
                seguindo = True
            else:
                return JsonResponse({"erro": "Ação inválida"}, status=400)

            perfil_atual.save()
            perfil_alvo.save()

            # 🔥 **Diferenciar AJAX de requisição normal**
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':  # Se for AJAX, retorna JSON
                return JsonResponse({"seguindo": seguindo})
            else:
                return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))  # Se não for AJAX, recarrega a página

        return redirect('perfil_usuario', username=perfil_alvo.username)
    
    def cadastro(request):
        if request.method == "GET":
            return render(request, 'cadastro.html')
        else:
            username = request.POST.get('username')
            email = request.POST.get('email')
            senha = request.POST.get('senha')
            
            user = Usuario.objects.filter(username=username).first()

            if user:
                return render(request, "cadastro_existente.html")

            # Cria o novo usuário
            user = Usuario.objects.create_user(username=username, email=email, password=senha)
            # user.foto_perfil = foto_perfil
            user.save()
            login_django(request, user)
            # return redirect('login')
            return redirect('escolher_comunidade')
        
    def perfil(request, username):
        user = get_object_or_404(Usuario, username=username)
        postagens = Postagem.objects.filter(usuario=user).order_by('-dataPublicacao')
        repositorios = Repositorio.objects.filter(usuario=user).order_by('-dataPublicacao').order_by('-dataPublicacao')
        # postagensComentadas =  Postagem.objects.filter(comentario__usuario=usuario).order_by('dataPublicacao')   
        comentarios = Comentario.objects.filter(usuario=user).order_by('-dataPostagem')

        comunidades = Comunidade.objects.all()
       
        for postagem in postagens:
                postagem.curtido = Curtida.objects.filter(usuario=request.user, postagem=postagem).exists()
        
        paginator = Paginator(postagens, 5)
        page_number = request.GET.get('page')
        postagens_paginator = paginator.get_page(page_number)

        is_following = False
        if request.user.is_authenticated:
            is_following = request.user.segue.filter(pk=user.pk).exists()

        context = {
            'usuario': user,
            'postagens_paginator': postagens_paginator,
            'is_following': is_following,
            'repositorios': repositorios,
            'comunidades': comunidades,
            "comentarios" : comentarios,
        }

        return render(request, 'perfilUsuario.html', context)



    @login_required
    @csrf_exempt  # 🔴 Remova isso se for usar o CSRF Token corretamente no JavaScript!
    def excluir_postagem(request, postagem_id):
        if request.method != "POST":
            return JsonResponse({"success": False, "error": "Método não permitido"}, status=405)

        postagem = get_object_or_404(Postagem, id=postagem_id)

        if request.user == postagem.usuario:
            postagem.delete()
            return JsonResponse({"success": True})

        return JsonResponse({"success": False, "error": "Você não tem permissão para excluir esta postagem."}, status=403)
    
    def navbarLateral(request, username):
        user = get_object_or_404(Usuario, username=username)
        
    def feed(request):
        postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Padrão: todas as postagens
        repositorios = Repositorio.objects.all().order_by('-dataPublicacao')
        comunidades = Comunidade.objects.all()

        if request.user.is_authenticated:
            user = request.user

            # Filtrando postagens apenas das comunidades que o usuário segue
            comunidades_seguidas = user.comunidades.all()
            postagens = Postagem.objects.filter(comunidade__in=comunidades_seguidas).order_by('-dataPublicacao')

            # Marcar curtidas para cada postagem
            for postagem in postagens:
                postagem.curtido = postagem.postagem_curtida.filter(usuario=request.user).exists()

            return render(request, 'feed.html', {
                'postagens': postagens,
                'user': request.user,
                'repositorios': repositorios,
                'comunidades': comunidades
            })

        # Usuário deslogado vê todas as postagens
        return render(request, 'feed_deslogado.html', {
            'postagens': postagens,
            'user': request.user,
            'repositorios': repositorios,
            'comunidades': comunidades
        })

    @login_required
    def feed_seguidos(request):
        user = request.user  # Usuário logado

        # Pegamos todos os usuários que o usuário logado segue
        usuarios_seguidos = user.segue.all()

        # Filtramos postagens apenas desses usuários
        postagens = Postagem.objects.filter(usuario__in=usuarios_seguidos).order_by('-dataPublicacao')
        comunidades = Comunidade.objects.all()
        for postagem in postagens:
                postagem.curtido = Curtida.objects.filter(usuario=request.user, postagem=postagem).exists()

        repositorios = Repositorio.objects.all().order_by('-dataPublicacao')  # Se for necessário no template

        return render(request, 'feed_seguidos.html', {'postagens': postagens, 'user': user, 'repositorios': repositorios, 'comunidades': comunidades})

    def pesquisa(request):
        query = request.GET.get('q', '')

        if query:
            usuarios = Usuario.objects.filter(nome__icontains=query).values('id', 'nome', 'descricao', 'imagemPerfil', 'username')
            postagens = Postagem.objects.filter(texto__icontains=query).values('id', 'texto', 'usuario__nome')

            usuarios_lista = list(usuarios)
            for usuario in usuarios_lista:
                if usuario['imagemPerfil']:
                    usuario['imagemPerfil'] = request.build_absolute_uri(settings.MEDIA_URL + usuario['imagemPerfil'])
                else:
                    usuario['imagemPerfil'] = request.build_absolute_uri(settings.STATIC_URL + 'img/default-profile.png')

            return JsonResponse({
                'usuarios': usuarios_lista,
                'postagens': list(postagens),
            })

        return JsonResponse({'usuarios': [], 'postagens': []})

    @login_required
    def criar_postagem(request):
        if request.method == "POST":
            texto = request.POST.get("descricao")
            comunidade_id = request.POST.get("comunidade")
            imagem = request.FILES.get("imagem")

            # Pegando categorias selecionadas
            categorias_selecionadas = request.POST.getlist("categorias")  # Retorna lista de IDs

            comunidade = Comunidade.objects.filter(id=comunidade_id).first()

            postagem = Postagem.objects.create(
                texto=texto,
                imagem=imagem,
                usuario=request.user,
                comunidade=comunidade,
            )

            # Adicionar categorias à postagem
            postagem.categorias.set(Categoria.objects.filter(id__in=categorias_selecionadas))

            messages.success(request, "Postagem criada com sucesso!")
            return redirect("perfil", username=request.user.username)  # Redireciona para o perfil

        comunidades = Comunidade.objects.all()
        categorias_materia = Categoria.objects.filter(tipo="mat")
        categorias_periodo = Categoria.objects.filter(tipo="per")
        categorias_tecnologia = Categoria.objects.filter(tipo="tec")

        return render(
            request, 
            "criar_postagem.html", 
            {
                "comunidades": comunidades,
                "categorias_materia": categorias_materia,
                "categorias_periodo": categorias_periodo,
                "categorias_tecnologia": categorias_tecnologia,
            }
        )

    @login_required
    def lista_seguidores_seguindo(request, user_id, tipo):
        usuario = get_object_or_404(Usuario, id=user_id)

        if tipo == "seguidores":
            usuarios = usuario.seguidores.all()
        elif tipo == "seguindo":
            usuarios = usuario.seguindo.all()
        else:
            return JsonResponse({"erro": "Tipo inválido"}, status=400)

        dados_usuarios = [
            {
                "id": user.id,
                "nome": user.nome,
                "username": user.username,
                "imagemPerfil": user.imagemPerfil.url if user.imagemPerfil else "/static/img/default-profile.png",
                "segue": request.user in user.seguidores.all(),
            }
            for user in usuarios
        ]

        return JsonResponse({"usuarios": dados_usuarios})
