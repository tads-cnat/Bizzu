from rest_framework import routers
from api.views.postagem import PostagemViewSet

postagemRouter = routers.DefaultRouter()
postagemRouter.register("postagem", PostagemViewSet)
