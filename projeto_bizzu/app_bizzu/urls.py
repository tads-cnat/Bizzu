from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views



urlpatterns=[
    path('', views.feed, name="feedDeslogado"),
    path('perfil/', views.perfil, name='perfil'),
    path('feed/', views.feed, name='feed'),
    # path('<uuid:postagem_id>/curtida/', views.curtida, name='curtida'),
    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', views.login, name='login'),
    path('repositorio/', views.verRepositorio, name='verRepositorio'),
    path('novo/repositorio/', views.novoRepositorio, name='novoRepositorio'),
    path('salvos/repositorio/', views.repositorioSalvos, name='repositorioSalvos'),
    path('sair/', views.sair, name='sair'),
    path('escolher-comunidade/', views.escolher_comunidade, name='escolher_comunidade'),
    # path('deslogado',views.deslogado,name='deslogado'),
    path('associar-comunidade/', views.associar_comunidade, name='associar_comunidade'),
    path('editar-perfil/', views.cadastro_perfil, name='cadastro_perfil'),
    path('comentar/<uuid:postagem_id>/', views.adicionar_comentario, name='adicionar_comentario'),
    path('api/comentarios/<uuid:postagem_id>/', views.get_comentarios, name='get_comentarios'),
    path('seguir/<int:pk>/', views.seguirPerfil, name='seguir_perfil'),
    path('editarPerfil/', views.editarPerfil, name='editarPerfil'),
    path('curtida/<uuid:postagem_id>/', views.curtida, name='curtida'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
