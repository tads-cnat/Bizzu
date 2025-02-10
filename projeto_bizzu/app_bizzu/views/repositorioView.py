from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.core.exceptions import ValidationError
from app_bizzu.models.repositorio import Repositorio
from app_bizzu.models.comunidade import Comunidade
from app_bizzu.models.postagem import Postagem
from app_bizzu.models.repositorio import ArquivoRepositorio
from app_bizzu.models.categoria import Categoria
from django.contrib.auth.decorators import login_required


class RepositorioView:
    def verRepositorio(request): #Ver a parte interna repositório
        repositorios = Repositorio.objects.all()
        if request.method == "GET":
            idRepositorio = request.GET.get('repositorio')
            repAtual = Repositorio.objects.get(id=idRepositorio)
            return render(request, "PagRepositorio.html", {'repositorios': repositorios, "repositorioAtual":repAtual, "usuario":request.user})
        elif request.method == "POST":
            idRepositorio = request.POST.get('repositoriosFavoritados')
            usuario = request.user
            repAtual = Repositorio.objects.get(id=idRepositorio)
            if (repAtual in usuario.repositoriosFavoritados.all()):
                usuario.repositoriosFavoritados.remove(Repositorio.objects.get(id=idRepositorio))
                return render(request, "PagRepositorio.html", {'repositorios': repositorios, "repositorioAtual":repAtual, "usuario":request.user})
            else:
                usuario.repositoriosFavoritados.add(Repositorio.objects.get(id=idRepositorio))
                return render(request, "PagRepositorio.html", {'repositorios': repositorios, "repositorioAtual":repAtual, "usuario":request.user})
        return render(request, "PagRepositorio.html", {'repositorios': repositorios})

    def excluirRepositorio(request):
        if request.method == "POST":
            idRepositorio = request.GET.get("excluirRepositorio")
            usuario = request.user 
            repositorios = Repositorio.objects.filter(usuario = usuario)
            repositorios = repositorios.filter(id= idRepositorio).first()
            if (repositorios):
                repositorios.delete()
                return HttpResponse("Exluiu")
        postagens = Postagem.objects.all().order_by('-dataPublicacao')  # Ordenar pela data (mais recente primeiro)
        repositorios = Repositorio.objects.all()
        return render(request, 'feed.html', {'postagens': postagens, 'user': request.user, 'repositorios': repositorios})
            


    @login_required
    def novoRepositorio(request):
        if request.method == "POST":
            titulo = request.POST.get('titulo')
            descricao = request.POST.get('descricao')
            comunidade_id = request.POST.get('comunidade')
            arquivos = request.FILES.getlist('arquivos')  # Suporte para múltiplos arquivos
            categorias_selecionadas = request.POST.getlist("categorias")  # Lista de categorias

            comunidade = Comunidade.objects.filter(id=comunidade_id).first()

            if titulo and descricao and comunidade and arquivos:
                repositorio = Repositorio.objects.create(
                    titulo=titulo,
                    descricao=descricao,
                    comunidade=comunidade,
                    usuario=request.user
                )

                # Associar categorias ao repositório
                repositorio.categorias.set(Categoria.objects.filter(id__in=categorias_selecionadas))

                # Salvar múltiplos arquivos
                for arquivo in arquivos:
                    ArquivoRepositorio.objects.create(repositorio=repositorio, arquivo=arquivo)

                messages.success(request, "Repositório criado com sucesso!")
                return redirect('perfil', username=request.user.username)

            else:
                messages.error(request, "Preencha todos os campos corretamente!")

        comunidades = Comunidade.objects.all()
        categorias_materia = Categoria.objects.filter(tipo="mat")
        categorias_periodo = Categoria.objects.filter(tipo="per")
        categorias_tecnologia = Categoria.objects.filter(tipo="tec")

        return render(
            request, 
            "PagCriarRepositorio.html",
            {
                "comunidades": comunidades,
                "categorias_materia": categorias_materia,
                "categorias_periodo": categorias_periodo,
                "categorias_tecnologia": categorias_tecnologia,
            }
        )

    def repositorioSalvos(request): #Ver todos os repostórios salvos 
        repositorios = Repositorio.objects.all()
        return render(request, "repositoriosFavoritos.html", {'repositorios': repositorios})