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
    def seguir(self, request, pk=None):
        comunidade_seguida = self.get_object()
        usuario_seguidor = Usuario.objects.all()
        comunidade_seguida.seguidores.add(usuario_seguidor)
        return Response(
            {"message": f"Agora você está seguindo {usuario_seguidor.username}"},
            status=status.HTTP_200_OK,
        )
    
    @action(detail=True, methods=["delete"])
    def deixar_de_seguir(self, request, pk=None):
        comunidade_seguida = self.get_object()
        usuario_seguidor = Usuario.objects.all()

        usuario_seguidor.seguidores.remove(comunidade_seguida)
        return Response(
            {"message": f"Você deixou de seguir {comunidade_seguida.username}"},
            status=status.HTTP_200_OK,
        )
    
    @action(detail=True, methods=["get"])
    def verificar_seguimento(self, request, pk=None):
        comunidade_seguida = self.get_object()
        usuario_seguidor = Usuario.objects.all()

        esta_seguindo = usuario_seguidor.seguidores.filter(id=comunidade_seguida.id).exists()
        return Response(
            {
                "esta_seguindo": esta_seguindo,
                "seguidores": comunidade_seguida.seguido_por.count(),
                "seguindo": comunidade_seguida.seguidores.count(),
            },
            status=status.HTTP_200_OK,
        )