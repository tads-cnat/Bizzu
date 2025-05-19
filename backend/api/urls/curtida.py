from rest_framework import routers
from api.views.postagem import CurtidaViewSet


curtidaRouter = router.DefaultRouter()
curtidaRouter.register("curtida", CurtidaViewSet)
