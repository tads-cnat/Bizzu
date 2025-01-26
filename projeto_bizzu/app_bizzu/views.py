from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from .models import Postagem, Comentario, Usuario, Repositorio, Comunidade

@login_required(login_url="/login/")
def feed(request):
    postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Ordenar pela data (mais recente primeiro)
    return render(request, 'feed.html', {'postagens': postagens})


def cadastro(request):
    if request.method == "GET":
        return render(request, 'cadastro.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        
        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse("Já existe um usuário com esse username")

        user = User.objects.create_user(username=username, email=email, password=senha)
        user.save()

        return HttpResponse("Usuário cadastrado com sucesso")

def login(request):
    if request.method == "GET":
       return render(request, 'login.html')
    else: 
        username = request.POST.get('username')
        senha = request.POST.get('senha')

        user = authenticate(username=username, password=senha)

        if user:
            login_django(request, user)
            return HttpResponse('Autenticado')
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
