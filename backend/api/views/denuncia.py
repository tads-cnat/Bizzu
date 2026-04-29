from rest_framework import viewsets
from ..models import Denuncia
from api.serializers.denuncia import DenunciaSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from ..permissions.moderador import Moderador
from ..permissions.internanuta import Internauta


class DenunciaViewSet(viewsets.ModelViewSet):
    queryset = Denuncia.objects.all()
    serializer_class = DenunciaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, Moderador | Internauta]

    @action(detail=False, methods=["get"], url_path="tipos-denuncia")
    def get_tipos_denuncia(self, request):
        tipos = [{"value": key, "label": label} for key, label in Denuncia.TIPO]
        return Response(tipos)
