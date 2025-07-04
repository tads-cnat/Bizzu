from django.forms import ImageField
from rest_framework import serializers
from ..models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id"]
        extra_kwargs = {"id": {"read_only": False}}


class UsuarioProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"

    def create(self, validated_data):
        senha = validated_data.pop("password")
        validated_data.pop("groups", None)
        validated_data.pop("user_permissions", None)
        validated_data.pop("repositoriosFavoritados", None)
        validated_data.pop("comunidades", None)
        validated_data.pop("segue", None)
        usuario = Usuario(**validated_data)
        usuario.set_password(senha)
        usuario.is_active = True
        usuario.save()
        return usuario

class PesquisaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["imagemPerfil", "nome"]