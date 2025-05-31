from django.urls import path, include
from .urls.postagem import postagemRouter
from .urls.comunidade import comunidadeRouter
from .urls.categoria import categoriaRouter


urlpatterns = [
    path("", include(postagemRouter.urls)),
    path("", include(comunidadeRouter.urls)),
    path("", include(categoriaRouter.urls)),
]
