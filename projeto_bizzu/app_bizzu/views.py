from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse, resolve
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from .models import Postagem, Comentario, Repositorio, Comunidade, Usuario, Curtida
from django.contrib.auth import logout
from django.core.paginator import Paginator

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
        return render(request, 'feed_deslogado.html', {'postagens': postagens, 'user': request.user})
        # return render(request, 'feed_deslogado.html')



def curtida(request, postagem_id):
    user = request.user
    post = Postagem.objects.get(id=postagem_id)
    curtido_atuais = post.curtidas
    curtido = Curtida.objects.filter(usuario=request.user, postagem=post).count()
    if not curtido: 
        curtido = Curtida.objects.create(usuario=user, postagem=post)
        curtido_atuais = curtido_atuais + 1
    else:
        curtido = Curtida.objects.filter(usuario=user, postagem=post).delete()
        curtido_atuais = curtido_atuais - 1
    
    post.curtidas = curtido_atuais
    post.save()
    return HttpResponseRedirect(reverse('feed'))

def perfil(request, username):
    user = get_object_or_404(Usuario, username=username)  # Obtém o usuário pelo username
    
    # Determina quais postagens exibir
    url_name = resolve(request.path).url_name
    if url_name == 'perfil':    
        postagens = Postagem.objects.filter(usuario=user).order_by('-dataPublicacao')
    else: 
        postagens = Postagem.objects.all().order_by('-dataPublicacao')

    # Paginação
    paginator = Paginator(postagens, 5)
    page_number = request.GET.get('page')
    postagens_paginator = paginator.get_page(page_number)

    return render(request, 'perfilUsuario.html', {'usuario': user, 'postagens_paginator': postagens_paginator})



def cadastro(request):
    if request.method == "GET":
        return render(request, 'cadastro.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        
        user = Usuario.objects.filter(username=username).first()

        # if user:
        #     # return HttpResponse("Já existe um usuário com esse username")
        #     return render(request, "cadastro_existente.html")

        # user = User.objects.create_user(username=username, email=email, password=senha)
        # user.save()

        # return HttpResponse("Usuário cadastrado com sucesso")

        if user:
            return render(request, "cadastro_existente.html")

        # Cria o novo usuário
        user = Usuario.objects.create_user(username=username, email=email, password=senha)
        # user.foto_perfil = foto_perfil
        user.save()
        # return redirect('login')
        return redirect('escolher_comunidade')

def login(request):
    if request.method == "GET":
       return render(request, 'login.html')
    else: 
        username = request.POST.get('username')
        senha = request.POST.get('senha')

        user = authenticate(username=username, password=senha)

        if user:
            login_django(request, user)
            # return HttpResponse('Autenticado')
            return redirect('feed')     # Tem que fazer com que ele vá para a view feed, e que na view feed ele veja se é POST ou GET para conseguir calcular as postagens
        else:
            return HttpResponse('Usuário ou senha inválidos')

def verRepositorio(request): #Ver a parte interna repositório
    #repositoriosFavoritados = request.POST.get('titulo')
    #Repositorio(repositoriosFavoritados = repositoriosFavoritados).save()
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
            usuario = Usuario.objects.first()
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


# @login_required
# def associar_comunidade(request):
#     if request.method == 'POST':
#         usuario = request.user
#         id_comunidade = request.POST.get('id_comunidade')
#         if id_comunidade:  # verifica se o id não está vazio
#             comunidade = Comunidade.objects.get(id=id_comunidade)
#             usuario.comunidades.add(comunidade)
#             return redirect('feed')
#     return render(request, 'comunidade.html')


@login_required
def escolher_comunidade(request):
    comunidades = Comunidade.objects.all()  # Buscar todas as comunidades do banco
    return render(request, "comunidade.html", {"comunidades": comunidades})



from django.contrib import messages

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

        return redirect('feed')  # Redireciona para o feed

    return render(request, 'comunidade.html', {"erro": "Erro ao associar comunidade."})
