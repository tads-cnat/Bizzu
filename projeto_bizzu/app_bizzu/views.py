from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

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
    return render(request,'PagRepositorio.html', context)

def pagInicial(request):
    context = {

    }
    return render(request, 'feed.html', context)

def deslogado(request):
    return render(request, 'feed_deslogado.html')