from rest_framework import routers
from api.views.categoria import CategoriaViewSet

categoriaRouter = routers.DefaultRouter()
categoriaRouter.register("categoria", CategoriaViewSet)
