from rest_framework import serializers
from ..models import Repositorio
from .usuario import UsuarioSerializer
from .categoria import CategoriaSerializer


class RepositorioSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Repositorio
        fields = "__all__"
