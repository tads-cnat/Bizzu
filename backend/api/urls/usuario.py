from django.urls import path
from rest_framework import routers
from api.views.usuario import UsuarioViewSet

usuarioRouter = routers.DefaultRouter()
usuarioRouter.register("usuario", UsuarioViewSet)
