from rest_framework import serializers
from ..models import Usuario


class PesquisaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["imagemPerfil", "nome"]
