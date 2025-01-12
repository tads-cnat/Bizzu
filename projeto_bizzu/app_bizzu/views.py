from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

def index(request):
    context = {
        'cor':'#F7C110',
        'link': '#',
        'icone': '/static/img/desconectar.svg',
        'label': 'ver', 
        'corBarra' : '#ffff',
        'placeInput' : 'senha'
        }
    return render(request,'feed.html', context)