from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from ..models import Repositorio, Comunidade


class RepositorioView:
    def verRepositorio(request): #Ver a parte interna repositório
        repositorios = Repositorio.objects.all()
        if request.method == "GET":
            idRepositorio = request.GET.get('repositorio')
            repAtual = Repositorio.objects.get(id=idRepositorio)
            return render(request, "PagRepositorio.html", {'repositorios': repositorios, "repositorioAtual":repAtual})
        elif request.method == "POST":
            idRepositorio = request.POST.get('repositoriosFavoritados')
            usuario = request.user
            usuario.repositoriosFavoritados.add(Repositorio.objects.get(id=idRepositorio))
        return render(request, "PagRepositorio.html", {'repositorios': repositorios})

    def novoRepositorio(request):
        if request.method == "POST":
            titulo = request.POST.get('titulo')
            descricao = request.POST.get('descricao')
            opcao = request.POST.get('opcao')
            arquivo = request.FILES.get('arquivo')
            if (opcao == "TADS"):
                comunidade = Comunidade.objects.all().filter(nome__icontains="TADS").first()
            elif (opcao == "INFOWEB"):
                comunidade = Comunidade.objects.all().filter(nome__icontains="INFOWEB").first()
            else:
                comunidade = Comunidade.objects.all().filter(nome__icontains="Redes").first()
            if (titulo and descricao and arquivo and comunidade): #Se tudo for preenchido ele vai salvar no BD
                usuario = request.user
                Repositorio(titulo = titulo, descricao = descricao, comunidade = comunidade, arquivo = arquivo, usuario = usuario).save() #Salvar de acordo com o atrúbuto 
                return HttpResponse("Deu bom")
            else:
                raise ValidationError(comunidade)
        repositorios = Repositorio.objects.all()
        return render(request, "PagCriarRepositorio.html", {'repositorios': repositorios})

    def repositorioSalvos(request): #Ver todos os repostórios salvos 
        repositorios = Repositorio.objects.all()
        return render(request, "repositoriosFavoritos.html", {'repositorios': repositorios})