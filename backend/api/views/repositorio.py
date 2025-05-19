from rest_framework import viewsets
from ..models import Repositorio
from api.serializers.repositorio import RepositorioSerializer


class RepositorioViewSet(viewsets.ModelViewSet):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer


# O modelViewSet já fornece as operações do CRUD prontas
