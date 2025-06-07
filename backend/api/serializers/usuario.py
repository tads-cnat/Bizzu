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
