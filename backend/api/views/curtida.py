from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models.curtida import Curtida
from api.serializers.curtida import CurtidaSerializer


class CurtidaViewSet(viewsets.ModelViewSet):
    queryset = Curtida.objects.all()
    serializer_class = CurtidaSerializer

    @action(detail=False, methods=["get"])
    def verificar(self, request):
        usuario_id = request.query_params.get("usuario")
        postagem_id = request.query_params.get("postagem")

        if not usuario_id or not postagem_id:
            return Response(
                {"error": "Parâmetros incompletos"}, status=status.HTTP_400_BAD_REQUEST
            )

        curtida_existe = Curtida.objects.filter(
            usuario_id=usuario_id, postagem_id=postagem_id
        ).exists()

        return Response({"curtido": curtida_existe})

    @action(detail=False, methods=["post"])
    def alternar(self, request):
        usuario_id = request.data.get("usuario")
        postagem_id = request.data.get("postagem")

        if not usuario_id or not postagem_id:
            return Response(
                {"error": "Parâmetros incompletos"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            curtida = Curtida.objects.get(
                usuario_id=usuario_id, postagem_id=postagem_id
            )
            # Se a curtida existe, remova-a (descurtir)
            curtida.delete()
            curtido = False
        except Curtida.DoesNotExist:
            # Se a curtida não existe, crie-a (curtir)
            Curtida.objects.create(usuario_id=usuario_id, postagem_id=postagem_id)
            curtido = True

        # Contar o total de curtidas para esta postagem
        total_curtidas = Curtida.objects.filter(postagem_id=postagem_id).count()

        return Response({"curtido": curtido, "total": total_curtidas})

    @action(detail=True, methods=["get"])
    def contar(self, request, pk=None):
        total_curtidas = Curtida.objects.filter(postagem_id=pk).count()
        return Response({"total": total_curtidas})


# from rest_framework import viewsets, permissions, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from api.models import Curtida, Postagem
# from api.serializers.curtida import CurtidaSerializer


# class CurtidaViewSet(viewsets.ModelViewSet):
#     queryset = Curtida.objects.all()
#     serializer_class = CurtidaSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(usuario=self.request.user)

#     @action(detail=False, methods=["post"], url_path="alternar")
#     def alternar_curtida(self, request):
#         postagem_id = request.data.get("postagem_id")
#         try:
#             postagem = Postagem.objects.get(id=postagem_id)
#         except Postagem.DoesNotExist:
#             return Response(
#                 {"detail": "Postagem não encontrada."}, status=status.HTTP_404_NOT_FOUND
#             )

#         curtida, created = Curtida.objects.get_or_create(
#             usuario=request.user, postagem=postagem
#         )

#         if created:
#             curtida.delete()
#             return Response({"curtido": False})

#         return Response({"curtido": True})
