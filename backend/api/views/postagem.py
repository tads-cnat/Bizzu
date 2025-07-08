from rest_framework import viewsets, permissions
from ..models import Postagem, Usuario
from api.serializers.postagem import PostagemSerializer, PostagemUpdateSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import action
from rest_framework.response import Response


class PostagemViewSet(viewsets.ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    parser_classes = [MultiPartParser]
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]

        return [permission() for permission in permission_classes]

    def getSerializer(self):
        if self.request.method == "GET" or self.request.method == "POST":
            return PostagemSerializer
        elif self.request.method == "PATCH" or self.request.method == "PUT":
            return PostagemUpdateSerializer

    @action(
        detail=True, methods=["GET"], permission_classes=[permissions.AllowAny]
    )  # Para pegar todos os post de um usuário especifico
    def getPost(self, request, pk):
        try:
            postagens = Postagem.objects.filter(usuario__pk=pk)

            if not postagens.exists():
                return Response({"message": "Não existem postagens para este usuário"})

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(
        detail=False,
        methods=["GET"],
        url_path="postCommunity/(?P<username>.*)",
        permission_classes=[permissions.AllowAny],
    )  # Para pegar todos os post de comunidade que um usuário segue
    def getPostComunidade(self, request, username):
        try:
            usuario = Usuario.objects.filter(username=username).first()
            if not usuario:
                return Response({"message": "Usuário não encontrado"})

            comunidades = usuario.comunidades.all()
            postagens = Postagem.objects.filter(comunidade__in=comunidades).order_by(
                "-dataPublicacao"
            )

            if not postagens.exists():
                return Response(
                    {"message": "Não existem postagens para estas comunidades"}
                )

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(
        detail=False,
        methods=["GET"],
        url_path="postFollowers/(?P<username>.*)",
        permission_classes=[permissions.AllowAny],
    )  # Para pegar todos os post de seguidores que um usuário segue
    def getPostSeguidores(self, request, username):
        try:
            usuario = Usuario.objects.filter(username=username).first()
            if not usuario:
                return Response({"message": "Usuário não encontrado"})

            seguidores = usuario.segue.all()
            postagens = Postagem.objects.filter(usuario__in=seguidores).order_by(
                "-dataPublicacao"
            )

            if not postagens.exists():
                return Response(
                    {"message": "Não existem postagens para estes usuarios"}
                )

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
