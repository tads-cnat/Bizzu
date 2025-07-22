from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from api.models import Comunidade, Usuario
from api.serializers.comunidade import ComunidadeSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class ComunidadeViewSet(viewsets.ModelViewSet):
    queryset = Comunidade.objects.all()
    serializer_class = ComunidadeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def seguir_comunidade(self, request, pk=None):
        comunidade_seguida = self.get_object()
        usuario_seguidor = request.user
        comunidade_seguida.seguidores.add(usuario_seguidor)

        return Response(
            {"message": f"Agora você está seguindo {comunidade_seguida.nome}"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["delete"])
    def deixar_de_seguir_comunidade(self, request, pk=None):
        comunidade_seguida = self.get_object()
        usuario_seguidor = request.user

        comunidade_seguida.seguidores.remove(usuario_seguidor)

        return Response(
            {"message": f"Você deixou de seguir {comunidade_seguida.nome}"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["get"])
    def verificar_seguimento_comunidade(self, request, pk=None):
        comunidade = self.get_object()
        usuario = request.user
        esta_seguindo = comunidade.seguidores.filter(id=usuario.id).exists()
        return Response({"esta_seguindo": esta_seguindo})

    @action(detail=True, methods=["get"])
    def contar_seguidores_comunidade(self, request, pk=None):
        comunidade = self.get_object()
        return Response(
            {"seguidores": comunidade.seguidores.count()}, status=status.HTTP_200_OK
        )
