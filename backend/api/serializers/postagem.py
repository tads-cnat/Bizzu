from rest_framework import serializers
from ..models import Postagem
from ..serializers.usuario import UsuarioSerializer
from ..models.categoria import Categoria

class PostagemSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    categorias = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Categoria.objects.all())

    class Meta:
        model = Postagem
        fields = "__all__"
        
    def create(self, validated_data):
        categorias_data = validated_data.pop('categorias', [])
        postagem = Postagem.objects.create(**validated_data)
        postagem.categorias.set(categorias_data)
        return postagem
    
    def update(self, instance, validated_data):
        categorias_data = validated_data.pop('categorias', [])
        
        # Atualizar campos básicos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Atualizar categorias
        instance.categorias.set(categorias_data)
        return instance