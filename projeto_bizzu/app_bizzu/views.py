from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from .models import Postagem, Comentario, Repositorio, Comunidade, Usuario, Curtida
from django.contrib.auth import logout

# @login_required(login_url="/login/")
# def feed(request):
#     user = request.user #LR
#     postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Ordenar pela data (mais recente primeiro)
#     return render(request, 'feed.html', {'postagens': postagens})

def feed(request):
    if request.user.is_authenticated:  # Verificação de login
        user = request.user
        postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Ordenar pela data (mais recente primeiro)
        return render(request, 'feed.html', {'postagens': postagens, 'user': request.user})
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
        return render(request, 'comunidade.html')

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

def verRepositorio(request):
    if request.method == "POST":
        repositoriosFavoritados = request.POST.get('titulo')
        Repositorio(repositoriosFavoritados = repositoriosFavoritados).save()
    return render(request, "PagRepositorio.html")

def novoRepositorio(request):
    if request.method == "POST":
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        opcao = request.POST.get('opcao')
        arquivo = request.FILES.get('arquivo')
        if (opcao == "tads"):
            comunidade = Comunidade.objects.all().filter(nome__icontains="TADS").first()
        elif (opcao == "infoweb"):
            comunidade = Comunidade.objects.all().filter(nome__icontains="INFOWEB").first()
        else:
            comunidade = Comunidade.objects.all().filter(nome__icontains="Redes").first()
        if (titulo and descricao and arquivo and comunidade): #Se tudo for preenchido ele vai salvar no BD
            usuario = Usuario.objects.first()
            Repositorio(titulo = titulo, descricao = descricao, comunidade = comunidade, arquivo = arquivo, usuario = usuario).save() #Salvar de acordo com o atrúbuto 
            return HttpResponse("Deu bom")
        else:
            raise ValidationError(comunidade)
    return render(request, "PagCriarRepositorio.html")



def sair(request):
    logout(request)  # Desloga o usuário
    return redirect('feed')  # Redireciona para a página de login ou outra página