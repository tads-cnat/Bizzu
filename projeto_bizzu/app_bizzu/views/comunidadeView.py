from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from ..models import Comunidade
from django.contrib import messages
from django.views import View
from app_bizzu.models.comunidade import Comunidade
from app_bizzu.models.postagem import Postagem
from app_bizzu.models.usuario import Usuario
class ComunidadeView(View):
    
    def comunidade_detalhe(request, comunidade_id):
        comunidade = get_object_or_404(Comunidade, id=comunidade_id)
        postagens = Postagem.objects.filter(comunidade=comunidade).order_by('-dataPublicacao')
        
        
        # Buscar outras comunidades excluindo a atual
        outras_comunidades = Comunidade.objects.exclude(id=comunidade.id)[:2]

        # Verifica se o usuário está seguindo a comunidade
        seguindo = request.user in comunidade.seguidores.all() if request.user.is_authenticated else False

        return render(request, 'comunidade_detalhe.html', {
            'comunidade': comunidade,
            'postagens': postagens,
            'outras_comunidades': outras_comunidades,
            'seguindo': seguindo
        })

    
    @login_required
    def seguir_comunidade(request, comunidade_id):
        comunidade = get_object_or_404(Comunidade, id=comunidade_id)
        usuario = request.user

        if request.method == "POST":
            acao = request.POST.get("follow")  # Obtém a ação do botão
            
            if acao == "unfollow":
                usuario.comunidades.remove(comunidade)  # Deixa de seguir
                comunidade.seguidores.remove(usuario)
                messages.success(request, f"Você deixou de seguir a comunidade {comunidade.nome}.")
            elif acao == "follow":
                usuario.comunidades.add(comunidade)  # Começa a seguir
                comunidade.seguidores.add(usuario)
                messages.success(request, f"Agora você está seguindo a comunidade {comunidade.nome}!")

            # Salvar no banco
            usuario.save()
            comunidade.save()

            return redirect('detalhes_comunidade', comunidade_id=comunidade.id)

        return redirect('feed')
    
    @login_required
    def escolher_comunidade(request):
        comunidades = Comunidade.objects.all()  # Buscar todas as comunidades do banco
        return render(request, "comunidade.html", {"comunidades": comunidades})

    @login_required
    def associar_comunidade(request):
        if request.method == 'POST':
            usuario = request.user
            id_comunidade = request.POST.get('id_comunidade')

            if not id_comunidade:
                messages.error(request, "Nenhuma comunidade selecionada.")
                return redirect('escolher_comunidade')

            comunidade = get_object_or_404(Comunidade, id=id_comunidade)

            # Verifica se o usuário já está na comunidade
            if usuario.comunidades.filter(id=id_comunidade).exists():
                messages.warning(request, f"Você já segue a comunidade {comunidade.nome}.")
            else:
                usuario.comunidades.add(comunidade)  # Adiciona o usuário à comunidade
                comunidade.seguidores.add(usuario)  # Garante que o usuário seja um seguidor
                messages.success(request, f"Agora você está seguindo {comunidade.nome}!")

            return redirect('cadastro_perfil')  # Redireciona para o término do cadastro.

        return render(request, 'comunidade.html', {"erro": "Erro ao associar comunidade."})