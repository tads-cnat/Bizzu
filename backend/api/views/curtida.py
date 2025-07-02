from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from api.models import Curtida, Postagem
from api.serializers.curtida import CurtidaSerializer


class CurtidaViewSet(viewsets.ModelViewSet):
    queryset = Curtida.objects.all()
    serializer_class = CurtidaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=["post"], url_path="alternar")
    def alternar_curtida(self, request):
        postagem_id = request.data.get("postagem_id")
        try:
            postagem = Postagem.objects.get(id=postagem_id)
        except Postagem.DoesNotExist:
            return Response(
                {"detail": "Postagem não encontrada."}, status=status.HTTP_404_NOT_FOUND
            )

        curtida, created = Curtida.objects.get_or_create(
            usuario=request.user, postagem=postagem
        )

        if not created:
            curtida.delete()
            return Response({
                "curtido": False,
                "total_curtidas": postagem.postagem_curtida.count()
            })

        return Response({
            "curtido": True,
            "total_curtidas": postagem.postagem_curtida.count()
        })

    @action(detail=False, methods=["get"], url_path="verificar/(?P<postagem_id>[^/.]+)")
    def verificar_curtida(self, request, postagem_id=None):
        try:
            postagem = Postagem.objects.get(id=postagem_id)
        except Postagem.DoesNotExist:
            return Response(
                {"detail": "Postagem não encontrada."}, status=status.HTTP_404_NOT_FOUND
            )

        curtida_existe = Curtida.objects.filter(
            usuario=request.user, postagem=postagem
        ).exists()

        return Response({
            "curtido": curtida_existe,
            "total_curtidas": postagem.postagem_curtida.count()
        })

    @action(detail=False, methods=["get"], url_path="contar/(?P<postagem_id>[^/.]+)")
    def contar_curtidas(self, request, postagem_id=None):
        try:
            postagem = Postagem.objects.get(id=postagem_id)
        except Postagem.DoesNotExist:
            return Response(
                {"detail": "Postagem não encontrada."}, status=status.HTTP_404_NOT_FOUND
            )

        return Response({
            "total_curtidas": postagem.postagem_curtida.count()
        })
