import os
from rest_framework import serializers
from ..models import Postagem


class PostagemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Postagem
        fields = "__all__"


class PostagemUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Postagem
        fields = ["texto", "imagem", "categorias", "comunidade"]

    def update(self, instance, validated_data):
        novaImagem = validated_data.get("imagem", None)
        if novaImagem and instance.imagem:
            if os.path.isfile(instance.imagem.path):
                os.remove(instance.imagem.path)
        return super().update(instance, validated_data)
