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
from rest_framework.parsers import MultiPartParser


class PostagemViewSet(viewsets.ModelViewSet):
    queryset = Postagem.objects.all()
    serializer_class = PostagemSerializer
    parser_classes = [MultiPartParser]
