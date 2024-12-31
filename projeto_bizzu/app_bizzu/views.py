from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

# Create your views here.

def index(request):
    context = {'nome':'ana'}
    return render(request,'naveBar1.html', context)