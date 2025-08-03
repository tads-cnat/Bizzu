from rest_framework import viewsets
from ..models import Arquivo
from api.serializers.arquivo import ArquivoSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class ArquivoViewSet(viewsets.ModelViewSet):
    queryset = Arquivo.objects.all()
    serializer_class = ArquivoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
