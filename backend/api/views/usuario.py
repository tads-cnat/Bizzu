from rest_framework import viewsets
from ..models import Usuario
from api.serializers.usuario import UsuarioSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=["get"])
    def me(self, request):
        """Retorna os dados do usuário logado"""
        if request.user.is_authenticated:
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        return Response({"error": "Usuário não autenticado"}, status=401)
