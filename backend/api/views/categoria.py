from rest_framework import viewsets
from ..models import Categoria
from api.serializers.categoria import CategoriaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
