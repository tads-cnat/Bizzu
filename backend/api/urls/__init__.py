from django.urls import path, include
from api.urls.postagem import postagemRouter
from api.urls.repositorio import repositorioRouter
from api.urls.usuario import usuarioRouter
from api.urls.curtida import curtidaRouter
from api.urls.comunidade import comunidadeRouter
from api.urls.categoria import categoriaRouter
from api.urls.comentario import comentarioRouter

urlpatterns = [
    path("", include(postagemRouter.urls)),
    path("", include(repositorioRouter.urls)),
    path("", include(usuarioRouter.urls)),
    path("", include(curtidaRouter.urls)),
    path("", include(comunidadeRouter.urls)),
    path("", include(categoriaRouter.urls)),
    path("", include(comentarioRouter.urls)),
]
