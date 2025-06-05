from django.forms import ImageField
from rest_framework import serializers
from ..models import Usuario
from drf_extra_fields.fields import Base64ImageField


class UsuarioSerializer(serializers.ModelSerializer):
    # imagemPerfil = ImageField(required=False, allow_null=True)

    class Meta:
        model = Usuario
        fields = ["id"]
        extra_kwargs = {"id": {"read_only": False}}
