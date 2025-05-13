from rest_framework import viewsets
from ..models import Postagem
from api.serializers.postagem import PostagemSerializer


class PostagemViewSet(viewsets.ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer


# O modelViewSet já fornece as operações do CRUD prontas
