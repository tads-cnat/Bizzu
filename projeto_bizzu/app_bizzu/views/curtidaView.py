from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from app_bizzu.models.curtida import Curtida
from app_bizzu.models.postagem import Postagem



class CurtidaView:
    # def curtida(request, postagem_id):
    #     user = request.user
    #     post = Postagem.objects.get(id=postagem_id)
    #     curtido_atuais = post.curtidas
    #     curtido = Curtida.objects.filter(usuario=request.user, postagem=post).count()
        
    #     if not curtido:
    #         Curtida.objects.create(usuario=user, postagem=post)
    #         curtido_atuais += 1
    #     else:
    #         Curtida.objects.filter(usuario=user, postagem=post).delete()
    #         curtido_atuais -= 1

    #     post.curtidas = curtido_atuais
    #     post.save()

    #     # Retorna a nova quantidade de curtidas para a parte do feed
    #     return JsonResponse({'curtidas': curtido_atuais})

    @login_required
    def curtida(request, postagem_id):
        user = request.user
        postagem = get_object_or_404(Postagem, id=postagem_id)

        curtida, created = Curtida.objects.get_or_create(usuario=user, postagem=postagem)

        if not created:
            curtida.delete()  # Se já existia, remove a curtida (descurtir)
            curtiu = False
        else:
            curtiu = True  # Se foi criada agora, significa que curtiu

        return JsonResponse({'curtidas': postagem.postagem_curtida.count(), 'curtiu': curtiu})