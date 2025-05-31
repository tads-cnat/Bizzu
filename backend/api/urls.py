from django.urls import path, include
from .urls.postagem import postagemRouter, comunidadeRouter, categoriaRouter  # importa seu router do postagem

urlpatterns = [
    path("", include(postagemRouter.urls)),
    path("", include(comunidadeRouter.urls)),
    path("", include(categoriaRouter.urls)),
]
