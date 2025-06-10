from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from ..models import Usuario
from api.serializers.usuario import UsuarioProfileSerializer, UsuarioSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    parser_classes = [MultiPartParser]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return UsuarioSerializer

        elif self.request.method == "POST":
            return UsuarioProfileSerializer

    @action(detail=False, methods=["get"], url_path="userByusername/(?P<username>.*)")
    def profileUsername(self, request, username):
        user = Usuario.objects.filter(username=username).first()
        serializador = UsuarioProfileSerializer(user)
        if serializador:
            return Response(serializador.data)
        else:
            return Response({"Algo deu errado": "serializador.errors"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def seguir(self, request, pk=None):
        usuario_seguido = self.get_object()
        usuario_seguidor = request.user

        if usuario_seguido == usuario_seguidor:
            return Response(
                {"error": "Você não pode seguir a si mesmo"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        usuario_seguidor.segue.add(usuario_seguido)
        return Response(
            {"message": f"Agora você está seguindo {usuario_seguido.username}"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["delete"], permission_classes=[IsAuthenticated])
    def deixar_de_seguir(self, request, pk=None):
        usuario_seguido = self.get_object()
        usuario_seguidor = request.user

        usuario_seguidor.segue.remove(usuario_seguido)
        return Response(
            {"message": f"Você deixou de seguir {usuario_seguido.username}"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def verificar_seguimento(self, request, pk=None):
        usuario_seguido = self.get_object()
        usuario_seguidor = request.user

        esta_seguindo = usuario_seguidor.segue.filter(id=usuario_seguido.id).exists()
        return Response(
            {
                "esta_seguindo": esta_seguindo,
                "seguidores": usuario_seguido.seguido_por.count(),
                "seguindo": usuario_seguido.segue.count(),
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"], url_path="usernameExits/(?P<username>.*)")
    def usernameExits(self, request, username):
        usuario = Usuario.objects.filter(username=username)
        if len(usuario) > 0:
            return Response({"data": "Um usuário com esse username já existe"})
        else:
            return Response({"data": "Um usuário com esse username não existe"})
