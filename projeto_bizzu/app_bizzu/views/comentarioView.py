from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from ..models import Postagem, Comentario
from django.views.decorators.http import require_POST


class ComentarioView:
    @login_required
    @require_POST
    def adicionar_comentario(request, postagem_id):
        postagem = get_object_or_404(Postagem, id=postagem_id)
        conteudo = request.POST.get('conteudo')
        
        if conteudo:
            comentario = Comentario.objects.create(
                usuario=request.user,
                postagem=postagem,
                conteudo=conteudo
            )
            return JsonResponse({
                'status': 'success',
                'comentario': {
                    'id': comentario.id,
                    'conteudo': comentario.conteudo,
                    'data': comentario.dataPostagem.strftime("%d/%m/%Y %H:%M"),
                    'usuario': {
                        'nome': comentario.usuario.nome,
                        'avatar': comentario.usuario.imagemPerfil.url if comentario.usuario.imagemPerfil else '/static/img/default-profile.png'
                    }
                }
            })
        else:
            return JsonResponse({'status': 'error', 'message': 'Conteúdo do comentário não fornecido'}, status=400)


    def get_comentarios(request, postagem_id):
        postagem = Postagem.objects.get(id=postagem_id)
        comentarios = Comentario.objects.filter(postagem=postagem).order_by('-dataPostagem')  # Ordena do mais recente para o mais antigo

        comentarios_json = [{
            'id': c.id,
            'conteudo': c.conteudo,
            'data': c.dataPostagem.strftime("%d/%m/%Y %H:%M"),
            'usuario': {
                'nome': c.usuario.nome,
                'avatar': c.usuario.imagemPerfil.url if c.usuario.imagemPerfil else '/static/img/default-profile.png'
            }
        } for c in comentarios]

        return JsonResponse(comentarios_json, safe=False)