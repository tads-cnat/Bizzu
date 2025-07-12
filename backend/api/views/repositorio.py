from rest_framework import viewsets
from ..models import Repositorio
from api.serializers.repositorio import RepositorioSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..permissions.basePermission import IsOwnerOrReadOnly


class RepositorioViewSet(viewsets.ModelViewSet):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


# O modelViewSet já fornece as operações do CRUD prontas
