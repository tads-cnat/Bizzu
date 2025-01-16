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
        'usuario.foto_perfil.url': 'https://i.pinimg.com/736x/98/3b/c2/983bc2b504ff8cb23dbc44b2a877e918.jpg',
        'post.tempo_postagem':'5h atrás',
        'usuario.nome':'Namaria',
        }
    return render(request,'feed.html', context)