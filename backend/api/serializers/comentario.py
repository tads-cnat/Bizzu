from rest_framework import serializers
from ..models.comentario import Comentario
from ..serializers.usuario import UsuarioSerializer


class ComentarioSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)

    class Meta:
        model = Comentario
        fields = ["id", "conteudo", "dataPostagem", "usuario", "postagem"]
        read_only_fields = ["id", "dataPostagem", "usuario"]


class ComentarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ["conteudo", "postagem"]

    def validate_conteudo(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("O comentário não pode estar vazio.")
        if len(value) > 500:
            raise serializers.ValidationError(
                "O comentário não pode ter mais de 500 caracteres."
            )
        return value.strip()
