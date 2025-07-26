from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from ..models import Usuario
from api.serializers.usuario import (
    UsuarioProfileSerializer,
    UsuarioSerializer,
    PesquisaSerializer,
    SolicitacaoSerializer,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from api.filters.usuario import UsuarioFilter
from rest_framework import filters
from ..models import Comunidade


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    parser_classes = [MultiPartParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if (
            self.action == "create"
            or self.action == "usernameExits"
            or self.action == "profileUsername"
            or self.action == "retrieve"
        ):
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return UsuarioSerializer

        elif self.request.method == "POST":
            if self.action == "solicitarMudanca":
                return SolicitacaoSerializer
            return UsuarioProfileSerializer
        return self.serializer_class

    @action(
        detail=False,
        methods=["get"],
        url_path="userByusername/(?P<username>.*)",
    )
    def profileUsername(self, request, username):
        user = Usuario.objects.filter(username=username).first()
        serializador = UsuarioProfileSerializer(user)
        if serializador:
            return Response(serializador.data)
        else:
            return Response({"Algo deu errado": "serializador.errors"})

    @action(detail=True, methods=["post"])
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

    @action(detail=True, methods=["delete"])
    def deixar_de_seguir(self, request, pk=None):
        usuario_seguido = self.get_object()
        usuario_seguidor = request.user

        usuario_seguidor.segue.remove(usuario_seguido)
        return Response(
            {"message": f"Você deixou de seguir {usuario_seguido.username}"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["get"])
    def verificar_seguimento(self, request, pk=None):
        usuario_seguido = self.get_object()
        usuario_seguidor = request.user

        esta_seguindo = usuario_seguidor.segue.filter(id=usuario_seguido.id).exists()
        esta_seguindo_comunidade = usuario_seguidor.comunidades_que_sigo.exists()
        print(esta_seguindo_comunidade)
        return Response(
            {
                "esta_seguindo": esta_seguindo,
                "esta_seguindo_comunidade": esta_seguindo_comunidade,
                "seguidores": usuario_seguido.seguido_por.count(),
                "seguindo": usuario_seguido.segue.count()
                + usuario_seguido.comunidades_que_sigo.count(),
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

    @action(detail=False, methods=["POST"], url_path="solicitarMudanca")
    def solicitarMudanca(self, request):
        serializer = SolicitacaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PesquisaViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = PesquisaSerializer
    filterset_class = UsuarioFilter
    filter_backends = [filters.SearchFilter]
    search_fields = ["username"]


class LogoutUsuarioView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request)
        refresh_token = request.data.get("refresh")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Usuário deslogado com sucesso."})
        except Exception as error:
            return Response({"error": str(error)})
