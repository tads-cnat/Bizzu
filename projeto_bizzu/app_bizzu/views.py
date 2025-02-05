from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse, resolve
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from .models import Postagem, Comentario, Repositorio, Comunidade, Usuario, Curtida
from django.contrib.auth import logout
from django.core.paginator import Paginator
from django.contrib import messages
from django.contrib.auth import login as login_django
from .forms import EditarPerfilForm, ComentarioForm, CadastrarPerfilForm
from django.utils import timezone
from django.views.decorators.http import require_POST
from django.conf import settings


# @login_required(login_url="/login/")
# def feed(request):
#     user = request.user #LR
#     postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Ordenar pela data (mais recente primeiro)
#     return render(request, 'feed.html', {'postagens': postagens})


def navbarLateral(request, username):
    user = get_object_or_404(Usuario, username=username)
        

def feed(request):
    if request.user.is_authenticated:  # Verificação de login
        user = request.user
        postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Ordenar pela data (mais recente primeiro)
        repositorios = Repositorio.objects.all()
        return render(request, 'feed.html', {'postagens': postagens, 'user': request.user, 'repositorios': repositorios})
    else:
        postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Ordenar pela data (mais recente primeiro)
        repositorios = Repositorio.objects.all()
        return render(request, 'feed_deslogado.html', {'postagens': postagens, 'user': request.user, 'repositorios': repositorios})
        # return render(request, 'feed_deslogado.html')



def curtida(request, postagem_id):
    user = request.user
    post = Postagem.objects.get(id=postagem_id)
    curtido_atuais = post.curtidas
    curtido = Curtida.objects.filter(usuario=request.user, postagem=post).count()
    
    if not curtido:
        Curtida.objects.create(usuario=user, postagem=post)
        curtido_atuais += 1
    else:
        Curtida.objects.filter(usuario=user, postagem=post).delete()
        curtido_atuais -= 1

    post.curtidas = curtido_atuais
    post.save()

    # Retorna a nova quantidade de curtidas para a parte do feed
    return JsonResponse({'curtidas': curtido_atuais})


@login_required
def seguirPerfil(request, pk):
    perfil_alvo = get_object_or_404(Usuario, id=pk)
    perfil_atual = request.user

    if request.method == "POST":
        acao = request.POST.get("follow")  # Obtém a ação do botão
        
        if acao == "unfollow":
            perfil_atual.segue.remove(perfil_alvo)
            perfil_alvo.seguidores.remove(perfil_atual)
        elif acao == "follow":
            perfil_atual.segue.add(perfil_alvo)
            perfil_alvo.seguidores.add(perfil_atual)

        # Salvar no banco
        perfil_atual.save()
        perfil_alvo.save()

        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))

    return redirect('perfil', username=perfil_alvo.username)


def perfil(request, username):
    user = get_object_or_404(Usuario, username=username)
    postagens = Postagem.objects.filter(usuario=user).order_by('-dataPublicacao')
    
    paginator = Paginator(postagens, 5)
    page_number = request.GET.get('page')
    postagens_paginator = paginator.get_page(page_number)

    is_following = False
    if request.user.is_authenticated:
        is_following = request.user.segue.filter(pk=user.pk).exists()

    context = {
        'usuario': user,
        'postagens_paginator': postagens_paginator,
        'is_following': is_following
    }

    return render(request, 'perfilUsuario.html', context)

# def perfil(request, username):
#     user = get_object_or_404(Usuario, username=username)  # Obtém o usuário pelo username
    
#     # Determina quais postagens exibir
#     url_name = resolve(request.path).url_name
#     if url_name == 'perfil':    
#         postagens = Postagem.objects.filter(usuario=user).order_by('-dataPublicacao')
#     else: 
#         postagens = Postagem.objects.all().order_by('-dataPublicacao')

#     # Paginação
#     paginator = Paginator(postagens, 5)
#     page_number = request.GET.get('page')
#     postagens_paginator = paginator.get_page(page_number)

#     return render(request, 'perfilPessoal.html', {'usuario': user, 'postagens_paginator': postagens_paginator})



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

from django.contrib.auth import authenticate, login as login_django
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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
                return JsonResponse({"status": "success", "redirect_url": "/feed/"})
            else:
                return JsonResponse({"status": "error", "message": "Usuário ou senha inválidos"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Erro no JSON"}, status=400)

    return JsonResponse({"status": "error", "message": "Método não permitido"}, status=405)

def verRepositorio(request): #Ver a parte interna repositório
    repositorios = Repositorio.objects.all()
    if request.method == "GET":
        idRepositorio = request.GET.get('repositorio')
        repAtual = Repositorio.objects.get(id=idRepositorio)
        return render(request, "PagRepositorio.html", {'repositorios': repositorios, "repositorioAtual":repAtual})
    elif request.method == "POST":
        idRepositorio = request.POST.get('repositoriosFavoritados')
        usuario = request.user
        usuario.repositoriosFavoritados.add(Repositorio.objects.get(id=idRepositorio))
    return render(request, "PagRepositorio.html", {'repositorios': repositorios})

def novoRepositorio(request):
    if request.method == "POST":
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        opcao = request.POST.get('opcao')
        arquivo = request.FILES.get('arquivo')
        if (opcao == "TADS"):
            comunidade = Comunidade.objects.all().filter(nome__icontains="TADS").first()
        elif (opcao == "INFOWEB"):
            comunidade = Comunidade.objects.all().filter(nome__icontains="INFOWEB").first()
        else:
            comunidade = Comunidade.objects.all().filter(nome__icontains="Redes").first()
        if (titulo and descricao and arquivo and comunidade): #Se tudo for preenchido ele vai salvar no BD
            usuario = request.user
            Repositorio(titulo = titulo, descricao = descricao, comunidade = comunidade, arquivo = arquivo, usuario = usuario).save() #Salvar de acordo com o atrúbuto 
            return HttpResponse("Deu bom")
        else:
            raise ValidationError(comunidade)
    repositorios = Repositorio.objects.all()
    return render(request, "PagCriarRepositorio.html", {'repositorios': repositorios})

def repositorioSalvos(request): #Ver todos os repostórios salvos 
    repositorios = Repositorio.objects.all()
    return render(request, "repositoriosFavoritos.html", {'repositorios': repositorios})

def sair(request):
    logout(request)  # Desloga o usuário
    return redirect('feed')  # Redireciona para a página de login ou outra página


@login_required
def escolher_comunidade(request):
    comunidades = Comunidade.objects.all()  # Buscar todas as comunidades do banco
    return render(request, "comunidade.html", {"comunidades": comunidades})


@login_required
def associar_comunidade(request):
    if request.method == 'POST':
        usuario = request.user
        id_comunidade = request.POST.get('id_comunidade')

        if not id_comunidade:
            messages.error(request, "Nenhuma comunidade selecionada.")
            return redirect('escolher_comunidade')

        comunidade = get_object_or_404(Comunidade, id=id_comunidade)

        # Verifica se o usuário já está na comunidade
        if usuario.comunidades.filter(id=id_comunidade).exists():
            messages.warning(request, f"Você já segue a comunidade {comunidade.nome}.")
        else:
            usuario.comunidades.add(comunidade)  # Adiciona o usuário à comunidade
            comunidade.seguidores.add(usuario)  # Garante que o usuário seja um seguidor
            messages.success(request, f"Agora você está seguindo {comunidade.nome}!")

        return redirect('cadastro_perfil')  # Redireciona para o término do cadastro.

    return render(request, 'comunidade.html', {"erro": "Erro ao associar comunidade."})

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
@require_POST
def adicionar_comentario(request, postagem_id):
    postagem = get_object_or_404(Postagem, id=postagem_id)
    conteudo = request.POST.get('conteudo')
    
    if conteudo:
        comentario = Comentario.objects.create(
            usuario=request.user,
            postagem=postagem,
            conteudo=conteudo
        )
        return JsonResponse({
            'status': 'success',
            'comentario': {
                'id': comentario.id,
                'conteudo': comentario.conteudo,
                'data': comentario.dataPostagem.strftime("%d/%m/%Y %H:%M"),
                'usuario': {
                    'nome': comentario.usuario.nome,
                    'avatar': comentario.usuario.imagemPerfil.url if comentario.usuario.imagemPerfil else '/static/img/default-profile.png'
                }
            }
        })
    else:
        return JsonResponse({'status': 'error', 'message': 'Conteúdo do comentário não fornecido'}, status=400)


def get_comentarios(request, postagem_id):
    postagem = Postagem.objects.get(id=postagem_id)
    comentarios = Comentario.objects.filter(postagem=postagem).order_by('-dataPostagem')  # Ordena do mais recente para o mais antigo

    comentarios_json = [{
        'id': c.id,
        'conteudo': c.conteudo,
        'data': c.dataPostagem.strftime("%d/%m/%Y %H:%M"),
        'usuario': {
            'nome': c.usuario.nome,
            'avatar': c.usuario.imagemPerfil.url if c.usuario.imagemPerfil else '/static/img/default-profile.png'
        }
    } for c in comentarios]

    return JsonResponse(comentarios_json, safe=False)

@login_required
def editarPerfil(request):
    if request.method == "POST":
        form = EditarPerfilForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Perfil atualizado com sucesso!')
            return redirect('perfil', username=request.user.username)
        else:
            messages.error(request, 'Por favor, corrija os erros abaixo.')
    else:
        form = EditarPerfilForm(instance=request.user)
    
    return render(request, 'editarPerfil.html', {'form': form})



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

