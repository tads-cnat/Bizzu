from rest_framework import serializers
from ..models import Comunidade


class ComunidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comunidade
        fields = "__all__"
