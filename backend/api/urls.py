from django.urls import path, include
from .urls.postagem import postagemRouter
from .urls.comunidade import comunidadeRouter
from .urls.categoria import categoriaRouter
from .urls.curtida import curtidaRouter
from .urls.repositorio import repositorioRouter
from .urls.usuario import usuarioRouter
from .urls.comentario import comentarioRouter
from .urls.arquivo import arquivoRouter

urlpatterns = [
    path("", include(postagemRouter.urls)),
    path("", include(comunidadeRouter.urls)),
    path("", include(categoriaRouter.urls)),
    path("", include(curtidaRouter.urls)),
    path("", include(repositorioRouter.urls)),
    path("", include(usuarioRouter.urls)),
    path("", include(comentarioRouter.urls)),
    path("", include(arquivoRouter.urls)),
    ]
