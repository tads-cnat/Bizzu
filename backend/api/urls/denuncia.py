from rest_framework import routers
from api.views.denuncia import DenunciaViewSet

denunciaRouter = routers.DefaultRouter()
denunciaRouter.register("denuncia", DenunciaViewSet)
