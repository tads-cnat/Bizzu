from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from api.models import Comunidade 
from api.serializers.comunidade import ComunidadeSerializer

class ComunidadeViewSet(viewsets.ModelViewSet):
    queryset = Comunidade.objects.all()
    serializer_class = ComunidadeSerializer
    permission_classes = [AllowAny]
