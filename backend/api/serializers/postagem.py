import base64
import uuid
from ..models.usuario import Usuario
from rest_framework import serializers
from ..models import Postagem
from ..serializers.usuario import UsuarioSerializer
from ..models.categoria import Categoria
from django.core.files.base import ContentFile
from django.conf import settings
from drf_extra_fields.fields import Base64ImageField


class PostagemSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()
    imagem = Base64ImageField(required=False, allow_null=True)
    categorias = serializers.PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Categoria.objects.all()
    )

    class Meta:
        model = Postagem
        fields = "__all__"

    def create(self, validated_data):
        usuario_data = validated_data.pop("usuario")
        user_id = usuario_data.get("id")
        try:
            usuario_instance = Usuario.objects.get(id=user_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError(f"Usuário não encontrado")

        if "nome" in usuario_data:
            usuario_instance.nome = usuario_data["nome"]

        if "imagemPerfil" in usuario_data:
            usuario_instance.imagemPerfil = usuario_data["imagemPerfil"]

        if "segue" in usuario_data:
            segue_ids = usuario_data["segue"]
            segue_instances = Usuario.objects.filter(id__in=segue_ids)
            usuario_instance.segue.set(segue_instances)

        usuario_instance.save()
        categorias_data = validated_data.pop("categorias", [])
        postagem = Postagem.objects.create(usuario=usuario_instance, **validated_data)
        postagem.categorias.set(categorias_data)

        return postagem

    def update(self, instance, validated_data):
        categorias_data = validated_data.pop("categorias", [])
        instance.categorias.set(categorias_data)
        for attr, value in validated_data.items():
            if attr != "usuario":
                setattr(instance, attr, value)
        instance.save()
        return instance

    def get_imagem(self, obj):
        if obj.imagem:  # Verifica se existe o campo imagem
            # Para desenvolvimento local
            if settings.DEBUG:
                return f"http://localhost:8000{obj.imagem.url}"
            # Para produção
            return f"https://seusite.com{obj.imagem.url}"
        return None


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and ";base64," in data:
            header, base64_data = data.split(";base64,")
            decoded_file = base64.b64decode(base64_data)
            file_name = f"{uuid.uuid4()}.{header.split('/')[-1]}"
            return ContentFile(decoded_file, name=file_name)
        return super().to_internal_value(data)
