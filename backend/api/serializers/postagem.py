from rest_framework import serializers
from ..models import Postagem
from ..serializers.usuario import UsuarioSerializer


class PostagemSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Postagem
        fields = "__all__"
