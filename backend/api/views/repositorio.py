from rest_framework import viewsets
from ..models import Repositorio
from api.serializers.repositorio import RepositorioSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class RepositorioViewSet(viewsets.ModelViewSet):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


# O modelViewSet já fornece as operações do CRUD prontas
