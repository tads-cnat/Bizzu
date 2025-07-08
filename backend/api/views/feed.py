from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from ..models.postagem import Postagem
from ..models.categoria import Categoria
from ..serializers.postagem import PostagemSerializer 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def feed_filtrado_por_categoria(request):
    try:
        nome_categoria = request.GET.get('categoria')
        
        if not nome_categoria:
            return Response(
                {"error": "Parâmetro 'categoria' é obrigatório"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            categoria = Categoria.objects.get(nome__iexact=nome_categoria)
        except Categoria.DoesNotExist:
            return Response(
                {"error": f"Categoria '{nome_categoria}' não encontrada"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        usuario_logado = request.user
        comunidades_seguidas = usuario_logado.comunidades.all()
        usuarios_seguidos = usuario_logado.segue.all()

        postagens = Postagem.objects.filter(
            Q(comunidade__in=comunidades_seguidas) | Q(usuario__in=usuarios_seguidos),
            categorias=categoria
        ).order_by('-dataPublicacao').distinct()
        
        serializer = PostagemSerializer(postagens, many=True)
        
        return Response({
            "categoria": categoria.nome,
            "total_postagens": postagens.count(),
            "postagens": serializer.data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {"error": f"Erro interno do servidor: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
