from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from api.models import Comunidade
from api.serializers.comunidade import ComunidadeSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class ComunidadeViewSet(viewsets.ModelViewSet):
    queryset = Comunidade.objects.all()
    serializer_class = ComunidadeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
