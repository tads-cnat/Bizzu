from django.urls import path
from rest_framework import routers
from api.views.usuario import UsuarioViewSet, PesquisaViewSet


usuarioRouter = routers.DefaultRouter()
usuarioRouter.register("usuario", UsuarioViewSet)
usuarioRouter.register("pesquisa", PesquisaViewSet, basename="pesquisar-usuario")
