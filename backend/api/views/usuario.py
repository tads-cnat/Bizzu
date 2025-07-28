from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, JSONParser
from ..models import Usuario, Solicitacao
from api.serializers.usuario import (
    UsuarioProfileSerializer,
    UsuarioSerializer,
    UsuarioPatchSerializer,
    PesquisaSerializer,
    SolicitacaoSerializer,
    AprovarSolicitacaoSerializer,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from api.filters.usuario import UsuarioFilter
from rest_framework import filters
from ..models import Comunidade
import requests
from django.conf import settings



class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    parser_classes = [MultiPartParser, JSONParser]
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
            if (
                self.action == "aprovarSolicitacao"
                or self.action == "reprovarSolicitacao"
            ):
                return AprovarSolicitacaoSerializer
            return UsuarioProfileSerializer
        elif self.request.method == "PATCH":
            return UsuarioPatchSerializer
        return UsuarioSerializer

    @action(detail=False, methods=["get"], url_path="userByusername/(?P<username>.*)")
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

    @action(detail=False, methods=["GET"], url_path="listarSolicitacoes")
    def listarSolicitacoes(self, request):
        solicitacoes = Solicitacao.objects.all().order_by("status", "data_solocitacao")
        serializer = SolicitacaoSerializer(solicitacoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["POST"], url_path="aprovarSolicitacao")
    def aprovarSolicitacao(self, request):
        serializer = AprovarSolicitacaoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        solicitacao_id = serializer.validated_data["id"]

        try:
            solicitacao = Solicitacao.objects.get(id=solicitacao_id)
        except Solicitacao.DoesNotExist:
            return Response({"error": "Solicitação não encontrada."}, status=404)

        usuario = solicitacao.solicitante
        usuario.papel = "mod"
        usuario.save()
        solicitacao.status = "aprovada"
        solicitacao.save()

        return Response(
            {"message": "Solicitação aprovada e usuário promovido a moderador."},
            status=200,
        )

    @action(detail=False, methods=["POST"], url_path="reprovarSolicitacao")
    def reprovarSolicitacao(self, request):
        serializer = AprovarSolicitacaoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        solicitacao_id = serializer.validated_data["id"]

        try:
            solicitacao = Solicitacao.objects.get(id=solicitacao_id)
        except Solicitacao.DoesNotExist:
            return Response({"error": "Solicitação não encontrada."}, status=404)

        solicitacao.status = "reprovada"
        solicitacao.save()

        return Response(
            {"message": "Solicitação reprovada."},
            status=200,
        )


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
        
class GoogleAuthView(APIView):
    permission_classes = [AllowAny]  # Permitir acesso sem JWT
    authentication_classes = []      # Desabilita autenticação padrão

    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "Token não fornecido"}, status=status.HTTP_400_BAD_REQUEST)

        # Valida token com o Google
        google_resp = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")
        if google_resp.status_code != 200:
            return Response({"error": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)

        google_data = google_resp.json()

        # Verifica se o token é para o seu Client ID
        if google_data.get("aud") != settings.GOOGLE_CLIENT_ID:
            return Response({"error": "Client ID inválido"}, status=status.HTTP_400_BAD_REQUEST)

        email = google_data["email"]
        name = google_data.get("name", email.split("@")[0])
        picture = google_data.get("picture")  # Caso queira salvar avatar


        print(google_data)
        print(google_data[name])
        print(google_data[picture]) 
        # Busca ou cria o usuário na tabela Usuario
        username = email.split("@")[0]
        user, created = Usuario.objects.get_or_create(
            email=email,
            defaults={
                "username": username,
                "nome": name,
                "imagemPerfil": picture
            }
        )
        
        if created: 
            token_pair =  Token.objects.create(created)
        else:
            token_pair = Token.objects.create(user)
        # Gera tokens JWT

        return Response({
            "refresh": str(token_pair.refresh_token),
            "access": str(token_pair.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "nome": getattr(user, "nome", name)
            }
        }, status=status.HTTP_200_OK)
        return Response({ ok: 'ok' }, status=status.HTTP_200_OK)