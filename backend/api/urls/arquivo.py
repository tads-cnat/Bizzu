from rest_framework.routers import DefaultRouter
from api.views.arquivo import ArquivoViewSet

arquivoRouter = DefaultRouter()
arquivoRouter.register(r'arquivo', ArquivoViewSet, basename='arquivo')

urlpatterns = arquivoRouter.urls