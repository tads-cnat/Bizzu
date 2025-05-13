from django.urls import path, include
from api.urls.postagem import postagemRouter

urlpatterns = [
    path("", include(postagemRouter.urls)),
]
