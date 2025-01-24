from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('feed',views.pagInicial,name='pagInicial'),
    path('deslogado',views.deslogado,name='deslogado'),

    path('index',views.index,name='index'),
    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', views.login, name='login')    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)