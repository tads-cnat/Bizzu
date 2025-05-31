from rest_framework import viewsets
from ..models import Categoria
from api.serializers.categoria import CategoriaSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]
