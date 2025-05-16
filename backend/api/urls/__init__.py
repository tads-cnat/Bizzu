from django.urls import path, include
from api.urls.postagem import postagemRouter
from api.urls.repositorio import repositorioRouter

urlpatterns = [
    path("", include(postagemRouter.urls)),
    path("", include(repositorioRouter.urls)),
]
