from rest_framework import routers
from api.views.repositorio import RepositorioViewSet

repositorioRouter = routers.DefaultRouter()
repositorioRouter.register("repositorio", RepositorioViewSet)
