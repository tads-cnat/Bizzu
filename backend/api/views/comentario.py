from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.models import Comentario, Postagem
from api.serializers.comentario import ComentarioSerializer, ComentarioCreateSerializer
from ..permissions.moderador import Moderador
from ..permissions.internanuta import Internauta
from ..permissions.admin import Adm


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, Moderador | Internauta | Adm]

    def get_serializer_class(self):
        if self.action == "create":
            return ComentarioCreateSerializer
        return ComentarioSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(
        detail=False,
        methods=["get"],
        url_path="postagem/(?P<postagem_id>[^/.]+)",
        permission_classes=[IsAuthenticated],
    )
    def comentarios_por_postagem(self, request, postagem_id=None):
        """
        Retorna todos os comentários de uma postagem específica
        ordenados do mais recente para o mais antigo
        """
        try:
            postagem = Postagem.objects.get(id=postagem_id)
        except Postagem.DoesNotExist:
            return Response(
                {"detail": "Postagem não encontrada."}, status=status.HTTP_404_NOT_FOUND
            )

        comentarios = (
            Comentario.objects.filter(postagem=postagem)
            .select_related("usuario")
            .order_by("-dataPostagem")
        )

        serializer = self.get_serializer(comentarios, many=True)
        return Response({"comentarios": serializer.data, "total": comentarios.count()})

    @action(detail=False, methods=["get"], url_path="contar/(?P<postagem_id>[^/.]+)")
    def contar_comentarios(self, request, postagem_id=None):
        """
        Retorna apenas o número total de comentários de uma postagem
        """
        try:
            postagem = Postagem.objects.get(id=postagem_id)
        except Postagem.DoesNotExist:
            return Response(
                {"detail": "Postagem não existente."}, status=status.HTTP_404_NOT_FOUND
            )

        total_comentarios = Comentario.objects.filter(postagem=postagem).count()

        return Response({"total_comentarios": total_comentarios})

    def create(self, request, *args, **kwargs):
        """
        Cria um novo comentário
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            postagem = Postagem.objects.get(id=request.data.get("postagem"))
        except Postagem.DoesNotExist:
            return Response(
                {"detail": "Não foi possivel criar o comentário."},
                status=status.HTTP_404_NOT_FOUND,
            )

        comentario = serializer.save(usuario=request.user, postagem=postagem)

        # Retorna o comentário criado com dados completos
        response_serializer = ComentarioSerializer(comentario)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
