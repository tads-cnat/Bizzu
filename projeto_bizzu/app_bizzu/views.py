from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

def index(request):
    context = {
        'corBotao':'#F7C110',
        'linkBotao': '#',
        'iconeBotao': '/static/img/desconectar.svg',
        'labelBotao': 'Abrir2', 
        'strokeBotao': '#F7C110',
        'corBarra' : '#ffff',
        'placeInput' : 'senha'
        }
    return render(request,'feed.html', context)