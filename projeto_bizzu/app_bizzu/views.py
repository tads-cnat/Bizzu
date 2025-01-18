from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

def index(request):
    context = {
        'placeInput' : 'senha',
        }
    return render(request,'feed.html', context)