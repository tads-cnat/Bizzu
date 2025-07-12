from rest_framework import routers
from api.views.comentario import ComentarioViewSet

comentarioRouter = routers.DefaultRouter()
comentarioRouter.register("comentario", ComentarioViewSet)
