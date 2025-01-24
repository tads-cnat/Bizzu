from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required(login_url="/login/")
def index(request):
        context = {
            'corBotao':'#9D0707',
            'corFonteBotao': '#ffffff',
            'linkBotao': '#',
            'iconeBotao': '/static/img/icone pagina inicial.png ',
            'labelBotao': 'Sair', 
            #'strokeBotao': '#058B92',
            'placeInput' : 'senha',
            #'corBotao2':'#9D0707',
            'corFonteBotao2': '#F79010',
            'linkBotao2': '#',
            #'iconeBotao2': '/static/img/icone pagina inicial.png ', #apenas se for selecionar comunidade
            'labelBotao2': 'Mais recente', 
            'strokeBotao2': '#F79010',
            'usuarioFotoPerfilUrl': '/static/img/logo.svg',
            'posttempo_postagem':'5h atrás',
            'usuarionome':'Namaria',
            }
        return render(request,'feed.html', context)

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