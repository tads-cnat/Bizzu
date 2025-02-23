from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from ..models import Comunidade
from django.contrib import messages
from django.views import View
class ComunidadeView(View):
    comunidades_info = {
        "tads": {
            'nome': 'TADS',
            'descricao': 'Curso de Análise e Desenvolvimento de Sistemas da DIATINF',
            'seguidores': 150,
            'imagem': 'img/comunidades/tads.jpg',
        },
        "redes": {
            'nome': 'REDES',
            'descricao': 'Curso de Redes da DIATINF',
            'seguidores': 120,
            'imagem': 'img/comunidades/redes.jpg',
        },
        "infoweb": {
            'nome': 'INFOWEB',
            'descricao': 'Curso de Infoweb da DIATINF',
            'seguidores': 90,
            'imagem': 'img/comunidades/infoweb.jpg',  
        },
    }

    def get(self, request, comunidade):
        if comunidade not in self.comunidades_info:
            messages.error(request, "Comunidade não encontrada.")
            return redirect('escolher_comunidade')
        
        return render(request, 'baseComunidade.html', {'comunidade': self.comunidades_info[comunidade]})
    
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