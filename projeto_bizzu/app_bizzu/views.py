from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

def index(request):
    context = {
        'cor':'#058B92',
        'link': '#',
        'icone': '/static/img/desconectar.svg',
        'label': 'ver'
        }
    #  #058B92
    return render(request,'feed.html', context)