from django.http import JsonResponse
from app_bizzu.models import Curtida, Postagem

class CurtidaView:
    def curtida(request, postagem_id):
        user = request.user
        post = Postagem.objects.get(id=postagem_id)
        curtido_atuais = post.curtidas
        curtido = Curtida.objects.filter(usuario=request.user, postagem=post).count()
        
        if not curtido:
            Curtida.objects.create(usuario=user, postagem=post)
            curtido_atuais += 1
        else:
            Curtida.objects.filter(usuario=user, postagem=post).delete()
            curtido_atuais -= 1

        post.curtidas = curtido_atuais
        post.save()

        # Retorna a nova quantidade de curtidas para a parte do feed
        return JsonResponse({'curtidas': curtido_atuais})