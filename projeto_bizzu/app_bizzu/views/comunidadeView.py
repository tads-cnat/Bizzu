from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from ..models import Comunidade
from django.contrib import messages


class ComunidadeView:
    @login_required
    def ver_comunidade(request):  
        return render(request, 'baseComunidade.html')
        
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
