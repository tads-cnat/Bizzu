from rest_framework import viewsets
from ..models import Comunidade
from api.serializers.comunidade import ComunidadeSerializer


class ComunidadeViewSet(viewsets.ModelViewSet):
    queryset = Comunidade.objects.all()
    serializer_class = ComunidadeSerializer
