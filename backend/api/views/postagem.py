from ..models.usuario import Usuario
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..models import Postagem
from api.serializers.postagem import PostagemSerializer
from django.middleware.csrf import get_token
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import Q
import base64


class PostagemViewSet(viewsets.ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=["GET"])
    def getPost(self, request, pk):
        try:
            postagens = Postagem.objects.filter(usuario__pk=pk)

            if not postagens.exists():
                return Response({"message": "Não existem postagens para este usuário"})

            serializer = self.get_serializer(postagens, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=400)


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    return Response({"status": "ok"})


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})
