from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
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

        if created:
            curtida.delete()
            return Response({"curtido": False})

        return Response({"curtido": True})
