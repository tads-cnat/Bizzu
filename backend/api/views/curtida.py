from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from api.models import Curtida, Postagem
from api.serializers.curtida import CurtidaSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class CurtidaViewSet(viewsets.ModelViewSet):
    queryset = Curtida.objects.all()
    serializer_class = CurtidaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(
        detail=False,
        methods=["post"],
        url_path="alternar",
        permission_classes=[IsAuthenticated],
    )
    def alternar_curtida(self, request):
        postagem_id = request.data.get("postagem_id")

        if not postagem_id:
            return Response(
                {"detail": "ID da postagem é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST,
            )

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
            return Response(
                {"curtido": False, "total_curtidas": postagem.postagem_curtida.count()}
            )

        return Response(
            {"curtido": True, "total_curtidas": postagem.postagem_curtida.count()}
        )

    @action(
        detail=False,
        methods=["get"],
        url_path="verificar/(?P<postagem_id>[^/.]+)",
        permission_classes=[IsAuthenticated],
    )
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

        return Response(
            {
                "curtido": curtida_existe,
                "total_curtidas": postagem.postagem_curtida.count(),
            }
        )

    @action(detail=False, methods=["get"], url_path="contar/(?P<postagem_id>[^/.]+)")
    def contar_curtidas(self, request, postagem_id=None):
        try:
            postagem = Postagem.objects.get(id=postagem_id)
        except Postagem.DoesNotExist:
            return Response(
                {"detail": "Postagem não encontrada."}, status=status.HTTP_404_NOT_FOUND
            )

        return Response({"total_curtidas": postagem.postagem_curtida.count()})
