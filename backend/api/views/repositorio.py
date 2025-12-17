from rest_framework import viewsets, status
from ..models import Repositorio
from api.serializers.repositorio import RepositorioSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models.arquivo import Arquivo
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..permissions.moderador import Moderador
from ..permissions.internanuta import Internauta


class RepositorioViewSet(viewsets.ModelViewSet):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, Moderador | Internauta]

    def get_permissions(self):
        if (
            self.action == "getRepo"
            or self.action == "getRepoComunidade"
            or self.action == "list"
        ):
            return [AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        instance = serializer.save(usuario=self.request.user)
        arquivos = self.request.FILES.getlist("arquivos[]")
        for arquivo in arquivos:
            Arquivo.objects.create(repositorio=instance, arquivo=arquivo)

    @action(
        detail=True, methods=["GET"]
    )  # Para pegar todos os repositórios de um usuário especifico
    def getRepo(self, request, pk):
        try:
            repositorios = Repositorio.objects.filter(usuario__pk=pk)

            if not repositorios.exists():
                return Response(
                    {"message": "Não existem repositorios para este usuário"}
                )

            serializer = self.get_serializer(repositorios, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(
        detail=True, methods=["GET"]
    )  # Para pegar todos os post de uma comunidade especifica
    def getRepoComunidade(self, request, pk):
        try:
            repositorio = Repositorio.objects.filter(comunidade__pk=pk)
            if not repositorio.exists():
                return Response(
                    {"message": "Não existem repositorio para esta comunidade"}
                )

            serializer = self.get_serializer(repositorio, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(
        detail=True, methods=["POST"], permission_classes=[IsAuthenticated]
    )  # Favoritar um repositório
    def favoritar(self, request, pk):
        try:
            repositorio = self.get_object()
            user = request.user

            if repositorio in user.repositoriosFavoritados.all():
                return Response(
                    {"message": "Repositório já está favoritado", "favoritado": True},
                    status=status.HTTP_200_OK,
                )

            user.repositoriosFavoritados.add(repositorio)
            return Response(
                {"message": "Repositório favoritado com sucesso", "favoritado": True},
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=True, methods=["DELETE"], permission_classes=[IsAuthenticated]
    )  # Desfavoritar um repositório
    def desfavoritar(self, request, pk):
        try:
            repositorio = self.get_object()
            user = request.user

            if repositorio not in user.repositoriosFavoritados.all():
                return Response(
                    {"message": "Repositório não está favoritado", "favoritado": False},
                    status=status.HTTP_200_OK,
                )

            user.repositoriosFavoritados.remove(repositorio)
            return Response(
                {
                    "message": "Repositório desfavoritado com sucesso",
                    "favoritado": False,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=True, methods=["GET"], permission_classes=[IsAuthenticated]
    )  # Verificar se o repositório está favoritado
    def verificar_favorito(self, request, pk):
        try:
            repositorio = self.get_object()
            user = request.user

            favoritado = repositorio in user.repositoriosFavoritados.all()
            return Response({"favoritado": favoritado}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
