from django.urls import path
from api.views.feed import feed_filtrado_por_categoria

urlpatterns = [
    path('feed/', feed_filtrado_por_categoria, name='feed-filtrado-categoria'),
]