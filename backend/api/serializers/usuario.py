from django.forms import ImageField
from rest_framework import serializers
from ..models import Usuario, Solicitacao


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "username", "nome", "imagemPerfil", "papel"]
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


class UsuarioPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "nome",
            "descricao",
            "escolaFormacao",
            "instituicaoAtual",
            "imagemPerfil",
            "linkedinUrl",
            "banner",
        ]


class PesquisaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "imagemPerfil",
            "username",
        ]


class SolicitacaoSerializer(serializers.ModelSerializer):
    # Usado para pegar o nome da pessoa que solicitou
    nome_solicitante = serializers.SerializerMethodField()

    def get_nome_solicitante(self, obj):
        return obj.solicitante.nome

    class Meta:
        model = Solicitacao
        fields = ["descricao", "solicitante", "status", "nome_solicitante", "id"]


# Tiver que criar esse serializer pois por algum motivo se eu tento usar o de cima da esso erro "[Violation] 'setTimeout' handler took 51ms"
class AprovarSolicitacaoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
