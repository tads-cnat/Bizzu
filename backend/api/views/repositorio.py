from rest_framework import viewsets
from ..models import Repositorio
from api.serializers.repositorio import RepositorioSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..permissions.basePermission import IsOwnerOrReadOnly
from ..models.arquivo import Arquivo


class RepositorioViewSet(viewsets.ModelViewSet):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        instance = serializer.save(usuario=self.request.user)
        arquivos = self.request.FILES.getlist("arquivos[]")
        for arquivo in arquivos:
            Arquivo.objects.create(repositorio=instance, arquivo=arquivo)


# O modelViewSet já fornece as operações do CRUD prontas
