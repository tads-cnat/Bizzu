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
from api.filters.usuario import UsuarioFilter, SolicitacaoFilter
from rest_framework import filters
import requests
from django.conf import settings
import secrets
from django.core.files.base import ContentFile
from urllib.parse import urlparse
import os
from ..permissions.moderador import Moderador
from ..permissions.internanuta import Internauta
from ..permissions.admin import Adm


def download_and_save_google_picture(picture_url, user):
    """
    Baixa a foto de perfil do Google e salva no sistema de arquivos
    """
    try:
        response = requests.get(picture_url, timeout=10)
        response.raise_for_status()

        content_type = response.headers.get("content-type", "")
        if not content_type.startswith("image/"):
            return False

        parsed_url = urlparse(picture_url)
        path = parsed_url.path
        extension = os.path.splitext(path)[1]

        if not extension:
            if "jpeg" in content_type or "jpg" in content_type:
                extension = ".jpg"
            elif "png" in content_type:
                extension = ".png"
            elif "gif" in content_type:
                extension = ".gif"
            elif "webp" in content_type:
                extension = ".webp"
            else:
                extension = ".jpg"

        filename = f"google_profile_{user.username}{extension}"
        image_content = ContentFile(response.content)
        user.imagemPerfil.save(filename, image_content, save=True)

        return True

    except requests.exceptions.RequestException:
        return False
    except Exception:
        return False


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
            return [(Moderador | Internauta | Adm)()]
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
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response(
                {"error": "Token não fornecido"}, status=status.HTTP_400_BAD_REQUEST
            )

        google_resp = requests.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        )
        if google_resp.status_code != 200:
            return Response(
                {"error": "Token Google inválido"}, status=status.HTTP_400_BAD_REQUEST
            )

        google_data = google_resp.json()

        if google_data.get("aud") != settings.GOOGLE_CLIENT_ID:
            return Response(
                {"error": "Client ID inválido"}, status=status.HTTP_400_BAD_REQUEST
            )

        email = google_data["email"]
        name = google_data.get("name", email.split("@")[0])
        picture = google_data.get("picture")

        base_username = email.split("@")[0]
        username = base_username
        count = 1
        while Usuario.objects.filter(username=username).exists():
            username = f"{base_username}{count}"
            count += 1

        user, created = Usuario.objects.get_or_create(
            email=email,
            defaults={
                "username": username,
                "nome": name,
                "descricao": "",
                "escolaFormacao": "",
                "instituicaoAtual": "",
                "papel": "int",
            },
        )

        if created:
            user.set_password(secrets.token_urlsafe(16))

            if picture:
                download_and_save_google_picture(picture, user)
            else:
                user.imagemPerfil = None

            user.save()
        else:
            if picture and not user.imagemPerfil:
                download_and_save_google_picture(picture, user)
                user.save()

        refresh = RefreshToken.for_user(user)

        response_data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "is_new": created,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "nome": user.nome,
                "imagemPerfil": (
                    request.build_absolute_uri(user.imagemPerfil.url)
                    if user.imagemPerfil
                    else None
                ),
                "descricao": user.descricao,
                "escolaFormacao": user.escolaFormacao,
                "instituicaoAtual": user.instituicaoAtual,
                "papel": user.papel,
            },
        }

        return Response(response_data, status=status.HTTP_200_OK)


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Solicitacao.objects.all()
    serializer_class = SolicitacaoSerializer
    filterset_class = SolicitacaoFilter
    filter_backends = [
        filters.OrderingFilter,
    ]
    ordering_fields = ["status", "data_solicitacao"]
    ordering = ["status"]

    def listarSolicitacoes(self, request):
        solicitacoes = Solicitacao.objects.all()
        serializer = SolicitacaoSerializer(solicitacoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
