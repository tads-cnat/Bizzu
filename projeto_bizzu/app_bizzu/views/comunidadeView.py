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
            'data_fundacao': '2004',  
            'coordenador': 'Demóstenes Santos',
            'seguidores': 150,
            'imagem': 'img/icone tads.svg'
        },
        "redes": {
            'nome': 'REDES',
            'descricao': 'Curso de Redes da DIATINF',
            'data_fundacao': '2004',  
            'coordenador': 'Demóstenes Santos',
            'seguidores': 120,
            'imagem': 'img/icone_redes.svg'
        },
        "infoweb": {
            'nome': 'INFOWEB',
            'descricao': 'Curso de Infoweb da DIATINF',
            'data_fundacao': '2004',  
            'coordenador': 'Demóstenes Santos',
            'seguidores': 90,
            'imagem': 'img/icone infoweb.svg' 
        },
    }

    def get(self, request, comunidade):
        if comunidade not in self.comunidades_info:
            messages.error(request, "Comunidade não encontrada.")
            return redirect('escolher_comunidade')
        
        # Filtro
        comunidades_disponiveis = {
            k: v for k, v in self.comunidades_info.items() if k != comunidade
        }
        
        return render(request, 'baseComunidade.html', {
            'comunidade': self.comunidades_info[comunidade],
            'comunidades_disponiveis': comunidades_disponiveis,
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

            return redirect('detalhes_comunidade', comunidade=comunidade.nome.lower())

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