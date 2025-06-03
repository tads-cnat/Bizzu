from rest_framework import serializers
from ..models import Usuario
from drf_extra_fields.fields import Base64ImageField


class UsuarioSerializer(serializers.ModelSerializer):
    imagemPerfil = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Usuario
        fields = ["id", "nome", "imagemPerfil", "segue"]
        extra_kwargs = {"id": {"read_only": False}}
