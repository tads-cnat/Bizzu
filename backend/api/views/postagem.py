from rest_framework import viewsets
from ..models import Postagem
from api.serializers.postagem import PostagemSerializer, PostagemUpdateSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import action
from rest_framework.response import Response


class PostagemViewSet(viewsets.ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    parser_classes = [MultiPartParser]

    def getSerializer(self):
        if self.request.method == "GET" or self.request.method == "POST":
            return PostagemSerializer
        elif self.request.method == "PATCH" or self.request.method == "PUT":
            return PostagemUpdateSerializer

    @action(
        detail=True, methods=["GET"]
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
