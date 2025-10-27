from rest_framework import serializers
from ..models import Comunidade


class ComunidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comunidade
        fields = [
            "id",
            "imagem",
            "nome",
            "descricao",
            "anoFundacao",
            "banner",
            "coordenacao",
            "seguidores",
            "usuario",
        ]

    def create(self, validated_data):
        seguidores = validated_data.pop("seguidores", None)
        comunidade = Comunidade.objects.create(**validated_data)
        if seguidores:
            comunidade.seguidores.set(seguidores)
        return comunidade
