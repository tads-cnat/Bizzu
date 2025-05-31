from rest_framework import routers
from api.views.comunidade import ComunidadeViewSet

comunidadeRouter = routers.DefaultRouter()
comunidadeRouter.register("comunidade", ComunidadeViewSet)
