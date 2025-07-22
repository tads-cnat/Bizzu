from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from ..models import Postagem, Usuario
from api.serializers.postagem import PostagemSerializer, PostagemUpdateSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..permissions.basePermission import IsOwnerOrReadOnly
from rest_framework.permissions import AllowAny
from rest_framework import status


class PostagemViewSet(viewsets.ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    parser_classes = [MultiPartParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_permissions(self):
        if (
            self.action == "getPost"
            or self.action == "getPostComunidade"
            or self.action == "list"
        ):
            return [AllowAny()]
        return super().get_permissions()

    def getSerializer(self):
        if self.request.method == "GET" or self.request.method == "POST":
            return PostagemSerializer
        elif self.request.method == "PATCH" or self.request.method == "PUT":
            return PostagemUpdateSerializer

    @action(
        detail=True, methods=["GET"]
    )  # Para pegar todos os post de um usuário especifico
    def getPost(self, request, pk):
        try:
            postagens = Postagem.objects.filter(usuario__pk=pk)

            if not postagens.exists():
                return Response({"message": "Não existem postagens para este usuário"})

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(
        detail=False,
        methods=["GET"],
        url_path="postCommunity/(?P<username>.*)",
    )  # Para pegar todos os post de comunidade que um usuário segue
    # so funcionou depois que mudei o nome dessa função
    def getPostComunidadee(self, request, username):
        try:
            usuario = Usuario.objects.filter(username=username).first()
            if not usuario:
                return Response({"message": "Usuário não encontrado"})

            comunidades = usuario.comunidades_que_sigo.all()
            postagens = Postagem.objects.filter(comunidade__in=comunidades).order_by(
                "-dataPublicacao"
            )

            if not postagens.exists():
                return Response(
                    {"message": "Não existem postagens para estas comunidades"}
                )

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(
        detail=False,
        methods=["GET"],
        url_path="postFollowers/(?P<username>.*)",
    )  # Para pegar todos os post de seguidores que um usuário segue
    def getPostSeguidores(self, request, username):
        try:
            usuario = Usuario.objects.filter(username=username).first()
            if not usuario:
                return Response({"message": "Usuário não encontrado"})

            seguidores = usuario.segue.all()
            postagens = Postagem.objects.filter(usuario__in=seguidores).order_by(
                "-dataPublicacao"
            )

            if not postagens.exists():
                return Response(
                    {"message": "Não existem postagens para estes usuarios"}
                )

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    @action(

        detail=True, methods=["GET"]
    )  # Para pegar todos os post de uma comunidade especifica
    def getPostComunidade(self, request, pk):
        try:
            postagens = Postagem.objects.filter(comunidade__pk=pk)

            if not postagens.exists():
                return Response(
                    {"message": "Não existem postagens para esta comunidade"}
                )

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
      @action(
        detail=False,
        methods=["GET"],
        url_path="filtrar-por-tags",
    )
    def filtrar_por_tags(self, request):
        """
        Filtra postagens por múltiplas tags de diferentes tipos
        Query params: tecnologia, curso, periodo (podem ser múltiplos valores separados por vírgula)
        """
        try:
            # Obter todos os parâmetros de filtro
            tecnologias = request.GET.get('tecnologia', '').split(',') if request.GET.get('tecnologia') else []
            cursos = request.GET.get('curso', '').split(',') if request.GET.get('curso') else []
            periodos = request.GET.get('periodo', '').split(',') if request.GET.get('periodo') else []
        
            # Limpar valores vazios
            tecnologias = [t.strip() for t in tecnologias if t.strip()]
            cursos = [c.strip() for c in cursos if c.strip()]
            periodos = [p.strip() for p in periodos if p.strip()]
        
            # Começar com todas as postagens
            queryset = Postagem.objects.all()
        
            # Aplicar filtros de tecnologia
            if tecnologias:
                for tecnologia in tecnologias:
                    queryset = queryset.filter(
                        categorias__nome__icontains=tecnologia,
                        categorias__tipo='tec'
                    )
        
            # Aplicar filtros de curso
            if cursos:
                for curso in cursos:
                    queryset = queryset.filter(
                        categorias__nome__icontains=curso,
                        categorias__tipo='mat'
                    )
        
            # Aplicar filtros de período
            if periodos:
                for periodo in periodos:
                    queryset = queryset.filter(
                        categorias__nome__icontains=periodo,
                        categorias__tipo='per'
                    )
        
            # Ordenar por data de publicação (mais recentes primeiro)
            queryset = queryset.order_by('-dataPublicacao').distinct()
        
            serializer = self.get_serializer(queryset, many=True)
        
            return Response({
                'total_postagens': queryset.count(),
                'filtros_aplicados': {
                    'tecnologias': tecnologias,
                    'cursos': cursos,
                    'periodos': periodos
                },
                'postagens': serializer.data
            })
        
        except Exception as e:
            return Response(
                {"error": f"Erro ao filtrar postagens: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
