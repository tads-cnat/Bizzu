import sys
from django.conf import settings
from django.urls import path
from django.http import HttpResponse


settings.configure(DEBUG=True, SECRETKEY='segredo', ROOT_URLCONF=__name__)


def index(request):
    return HttpResponse('<h3>Coloque na URL um "/tabuada/(número) para ver a tabuada de multiplicação de 1 até 10 do número desejado</h3>')

def tabuada(request, numero: int):
    result = f'<h1>Tabuada de multiplicação de {numero}</h1>'  
    result += '<table border="1" style="border-collapse: collapse;">'
    result += '<th>Multiplicador</th><th>Resultado</th>'  
    for i in range(1, 11):
        result += f'<tr><td>{numero} x {i}</td><td>{numero * i}</td></tr>' 
    result += '</table>' 
    return HttpResponse(result)

#URLs do projeto
urlpatterns = [
    path('', index),
    path('tabuada/<int:numero>', tabuada),
]

if __name__ == '__main__':
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)