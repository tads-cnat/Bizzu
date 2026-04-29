from rest_framework import routers
from api.views.curtida import CurtidaViewSet

curtidaRouter = routers.DefaultRouter()
curtidaRouter.register("curtida", CurtidaViewSet)
