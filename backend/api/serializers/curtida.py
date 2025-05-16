from rest_framework import serializers
from ..models import Curtida

class CurtidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curtida
        fields = '__all__'