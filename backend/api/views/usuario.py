from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from ..models import Usuario
from api.serializers.usuario import UsuarioProfileSerializer, UsuarioSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=["get"], url_path="userByusername/(?P<username>.*)")
    def profileUsername(self, request, username):
        user = Usuario.objects.filter(username=username).first()
        serializador = UsuarioProfileSerializer(user)
        if serializador:
            return Response(serializador.data)
        else:
            return Response({"Algo deu errado": "serializador.errors"})
